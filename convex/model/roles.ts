import type { Id } from "@/convex/_generated/dataModel";
import type { QueryCtx } from "@/convex/_generated/server";

export async function getRolesDeUsuario(
  ctx: QueryCtx,
  usuarioId: Id<"usuarios">,
  entornoId: Id<"entornos">,
) {
  const rolesUsuario = await ctx.db
    .query("usuarioRolEntorno")
    .withIndex("by_usuario_entorno", (q) =>
      q.eq("usuarioId", usuarioId).eq("entornoId", entornoId),
    )
    .order("asc")
    .collect();

  return await Promise.all(
    rolesUsuario.map(async (rol) => await getNombreRol(ctx, rol.rolId)),
  );
}

export async function getNombreRol(ctx: QueryCtx, rolId: Id<"roles">) {
  const rol = await ctx.db.get("roles", rolId);
  return rol?.nombre;
}
