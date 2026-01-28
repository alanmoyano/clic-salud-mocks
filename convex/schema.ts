import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  entornos: defineTable({
    id: v.float64(),
    nombre: v.string(),
  }),
  roles: defineTable({
    id: v.float64(),
    nombre: v.string(),
  }),
  usuarios: defineTable({
    cuil: v.string(),
    id: v.float64(),
    nombre: v.string(),
  }),
  usuarioRolEntorno: defineTable({
    usuarioId: v.id("usuarios"),
    rolId: v.id("roles"),
    entornoId: v.id("entornos"),
  })
    .index("by_usuario", ["usuarioId"])
    .index("by_usuario_entorno", ["usuarioId", "entornoId"])
    .index("by_usuario_rol_entorno", ["usuarioId", "rolId", "entornoId"]),
  usuarioXEntorno: defineTable({
    usuarioId: v.id("usuarios"),
    entornoId: v.id("entornos"),
    enUso: v.optional(v.boolean()),
  }).index("by_usuario", ["usuarioId"]),
});
