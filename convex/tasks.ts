import type { Id } from "@/convex/_generated/dataModel";
import { query, type QueryCtx } from "@/convex/_generated/server";
import { getRolesDeUsuario } from "@/convex/model/roles";

export const getUsuariosRolEntorno = query({
  async handler(ctx) {
    const usuariosEntorno = await ctx.db
      .query("usuarioXEntorno")
      .withIndex("by_usuario")
      .order("asc")
      .collect();

    const usuariosEntornoMapeados = await Promise.all(
      usuariosEntorno.map(async (usuarioEntorno) => {
        const usuario = await ctx.db.get("usuarios", usuarioEntorno.usuarioId);
        const roles = await getRolesDeUsuario(
          ctx,
          usuarioEntorno.usuarioId,
          usuarioEntorno.entornoId,
        );
        const entorno = await ctx.db.get("entornos", usuarioEntorno.entornoId);

        const usuarioEntornoMapeado = {
          id: usuario?._id,
          nombre: usuario?.nombre,
          cuil: usuario?.cuil,
          roles,
          entorno: entorno?.nombre,
        };

        return usuarioEntornoMapeado;
      }),
    );

    return usuariosEntornoMapeados.sort((a, b) =>
      a.roles.includes("Efector") ? -1 : 1,
    );
  },
});

async function getNombreEntorno(ctx: QueryCtx, entornoId: Id<"entornos">) {
  const entorno = await ctx.db.get("entornos", entornoId);
  return entorno?.nombre;
}
