import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "@/convex/_generated/server";
import { cuilsPersonasEnEquipos, insertionData } from "@/convex/data";
import { getRolesDeUsuario } from "@/convex/model/roles";
import { entornos } from "@/types/users";
import { v } from "convex/values";

export const getUsuariosRolEntorno = query({
  args: {},
  async handler(ctx) {
    const usuariosEntorno = await ctx.db
      .query("usuarioXEntorno")
      .withIndex("by_cantidad_usos")
      .order("desc")
      .collect();

    const usuariosEntornoMapeados = await Promise.all(
      usuariosEntorno.map(async (usuarioEntorno) => {
        const usuario = await ctx.db.get("usuarios", usuarioEntorno.idUsuario);
        if (!usuario) return;
        const roles = await getRolesDeUsuario(
          ctx,
          usuarioEntorno.idUsuario,
          usuarioEntorno.idEntorno,
        );
        const entorno = await ctx.db.get("entornos", usuarioEntorno.idEntorno);
        const equipo = await ctx.db.get("equipos", usuario?.idEquipo);

        const usuarioEntornoMapeado = {
          id: usuario?._id,
          nombre: usuario?.nombre,
          cuil: usuario?.cuil,
          roles: roles,
          entorno: entorno?.nombre,
          equipo: equipo?.nombre,
          prioridad: equipo?.prioridad,
        };

        return usuarioEntornoMapeado;
      }),
    );

    return usuariosEntornoMapeados.sort(
      (a, b) => (a?.prioridad ?? 0) - (b?.prioridad ?? 0) || 0,
    );
  },
});

async function getNombreEntorno(ctx: QueryCtx, entornoId: Id<"entornos">) {
  const entorno = await ctx.db.get("entornos", entornoId);
  return entorno?.nombre;
}

const userDataInsertionSchema = v.object({
  CUIL: v.string(),
  NOMBRE: v.string(),
  ROLES: v.string(),
});

export type UserDataInsertion = typeof userDataInsertionSchema.type;

export const insertarUsuariosXEntorno = mutation({
  args: v.object({
    entornoId: v.id("entornos"),
    data: v.array(userDataInsertionSchema),
  }),
  handler: async (ctx, args) => {
    const roles = await ctx.db.query("roles").collect();
    const equipos = await ctx.db.query("equipos").collect();
    const idEquipoSinEquipo = equipos.find((e) => e.id === 999_999)?._id;

    args.data.forEach(async (dato) => {
      let idEquipo;
      const equipoAsignado = cuilsPersonasEnEquipos[dato.CUIL];

      if (!equipoAsignado) {
        idEquipo = idEquipoSinEquipo;
      } else {
        idEquipo = equipos.find((e) => e.id === equipoAsignado)?._id;
      }

      if (!idEquipo) return;

      let idUsuario: Id<"usuarios">;
      const usuario = await ctx.db
        .query("usuarios")
        .withIndex("by_cuil", (q) => q.eq("cuil", dato.CUIL))
        .first();
      if (!usuario) {
        idUsuario = await ctx.db.insert("usuarios", {
          cuil: dato.CUIL,
          nombre: dato.NOMBRE,
          idEquipo: idEquipo,
        });
      } else {
        idUsuario = usuario._id;
      }

      await ctx.db.insert("usuarioXEntorno", {
        idUsuario: idUsuario,
        idEntorno: args.entornoId,
        enUso: false,
        cantidadUsos: 0,
      });

      dato.ROLES.split(",").forEach(async (rol) => {
        const rolId = roles.find((r) => r.id === Number(rol))?._id;
        if (!rolId) return;

        await ctx.db.insert("usuarioRolEntorno", {
          idUsuario: idUsuario,
          idRol: rolId,
          idEntorno: args.entornoId,
        });
      });
    });
  },
});

export const actualizarCantidadUsos = mutation({
  args: v.object({
    cuil: v.string(),
  }),
  handler: async (ctx, args) => {
    const usuario = await ctx.db
      .query("usuarios")
      .withIndex("by_cuil", (q) => q.eq("cuil", args.cuil))
      .first();
    if (!usuario) return;

    const usuarioXEntorno = await ctx.db
      .query("usuarioXEntorno")
      .withIndex("by_usuario", (q) => q.eq("idUsuario", usuario._id))
      .first();
    if (!usuarioXEntorno) return;

    await ctx.db.patch(usuarioXEntorno._id, {
      cantidadUsos: (usuarioXEntorno.cantidadUsos ?? 0) + 1,
    });
  },
});

export const vaciarUsuarios = mutation({
  handler: async (ctx) => {
    const usuariosRolEntorno = await ctx.db
      .query("usuarioRolEntorno")
      .collect();
    usuariosRolEntorno.forEach(async (usuarioRolEntorno) => {
      await ctx.db.delete(usuarioRolEntorno._id);
    });

    const usuariosXEntorno = await ctx.db.query("usuarioXEntorno").collect();
    usuariosXEntorno.forEach(async (usuarioXEntorno) => {
      await ctx.db.delete(usuarioXEntorno._id);
    });

    const usuarios = await ctx.db.query("usuarios").collect();
    usuarios.forEach(async (usuario) => {
      await ctx.db.delete(usuario._id);
    });
  },
});

export const pruebas = mutation({
  handler: async (ctx) => {
    await ctx.runMutation(api.tasks.vaciarUsuarios);
    await ctx.runMutation(api.tasks.insertarUsuariosXEntorno, {
      entornoId: entornos.dev,
      data: insertionData.dev,
    });
    await ctx.runMutation(api.tasks.insertarUsuariosXEntorno, {
      entornoId: entornos.test,
      data: insertionData.test,
    });
    await ctx.runMutation(api.tasks.insertarUsuariosXEntorno, {
      entornoId: entornos.demo,
      data: insertionData.demo,
    });
  },
});

export const insertarEquipos = mutation({
  handler: async (ctx) => {
    const equipos = [
      {
        id: 1,
        nombre: "Desarrollo",
        prioridad: 1,
      },
      {
        id: 2,
        nombre: "Testing",
        prioridad: 2,
      },
      {
        id: 3,
        nombre: "Análisis",
        prioridad: 3,
      },
      {
        id: 4,
        nombre: "VIP",
        prioridad: 4,
      },
      {
        id: 999_999,
        nombre: "Sin equipo",
        prioridad: 999_999,
      },
    ];

    equipos.forEach(async (equipo) => {
      await ctx.db.insert("equipos", {
        id: equipo.id,
        nombre: equipo.nombre,
        prioridad: equipo.prioridad,
      });
    });
  },
});

export const modificarUsuario = mutation({
  args: v.object({
    idUsuario: v.id("usuarios"),
    cuil: v.string(),
    nombre: v.string(),
    idEntorno: v.id("entornos"),
    idsRoles: v.array(v.id("roles")),
    idEquipo: v.id("equipos"),
  }),
  handler: async (ctx, args) => {
    const usuario = await ctx.db.get("usuarios", args.idUsuario);
    if (!usuario) return;

    const rolesUsuario = await ctx.db
      .query("usuarioRolEntorno")
      .withIndex("by_usuario", (q) => q.eq("idUsuario", args.idUsuario))
      .collect();

    if (args.cuil !== usuario.cuil) {
      await modificarCUIL(ctx, args.idUsuario, args.cuil);
    }

    if (args.nombre !== usuario.nombre) {
      await modificarNombre(ctx, args.idUsuario, args.nombre);
    }

    if (args.idEquipo !== usuario.idEquipo) {
      await modificarEquipo(ctx, args.idUsuario, args.idEquipo);
    }

    if (args.idsRoles !== rolesUsuario.map((r) => r.idRol)) {
      await modificarRoles(ctx, args.idUsuario, args.idEntorno, args.idsRoles);
    }
  },
});

async function modificarCUIL(
  ctx: MutationCtx,
  idUsuario: Id<"usuarios">,
  cuil: string,
) {
  const usuario = await ctx.db.get("usuarios", idUsuario);
  if (!usuario) return;

  await ctx.db.patch("usuarios", idUsuario, {
    cuil: cuil,
  });
}

async function modificarNombre(
  ctx: MutationCtx,
  idUsuario: Id<"usuarios">,
  nombre: string,
) {
  const usuario = await ctx.db.get("usuarios", idUsuario);
  if (!usuario) return;

  await ctx.db.patch("usuarios", idUsuario, {
    nombre: nombre,
  });
}

async function modificarEquipo(
  ctx: MutationCtx,
  idUsuario: Id<"usuarios">,
  idEquipo: Id<"equipos">,
) {
  const usuario = await ctx.db.get("usuarios", idUsuario);
  if (!usuario) return;

  await ctx.db.patch("usuarios", idUsuario, {
    idEquipo: idEquipo,
  });
}

async function modificarRoles(
  ctx: MutationCtx,
  idUsuario: Id<"usuarios">,
  idEntorno: Id<"entornos">,
  idsRoles: Id<"roles">[],
) {
  const usuario = await ctx.db.get("usuarios", idUsuario);
  if (!usuario) return;

  const rolesUsuario = await ctx.db
    .query("usuarioRolEntorno")
    .withIndex("by_usuario", (q) => q.eq("idUsuario", idUsuario))
    .collect();

  rolesUsuario.forEach(async (rol) => {
    if (!idsRoles.includes(rol.idRol)) {
      await ctx.db.delete("usuarioRolEntorno", rol._id);
    }
  });

  idsRoles.forEach(async (idRol) => {
    if (idsRoles.includes(idRol)) {
      await ctx.db.insert("usuarioRolEntorno", {
        idUsuario: idUsuario,
        idRol: idRol,
        idEntorno: idEntorno,
      });
    }
  });
}
