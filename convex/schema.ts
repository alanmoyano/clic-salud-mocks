import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  entornos: defineTable({
    id: v.float64(),
    nombre: v.string(),
  }).index("by_id_nombre", ["id", "nombre"]),
  roles: defineTable({
    id: v.float64(),
    nombre: v.string(),
  }).index("by_id_nombre", ["id", "nombre"]),
  usuarios: defineTable({
    cuil: v.string(),
    nombre: v.string(),
    idEquipo: v.id("equipos"),
  })
    .index("by_nombre", ["nombre"])
    .index("by_id_equipo", ["idEquipo"])
    .index("by_cuil", ["cuil"]),
  equipos: defineTable({
    id: v.float64(),
    nombre: v.string(),
    prioridad: v.optional(v.float64()),
  })
    .index("by_nombre", ["nombre"])
    .index("by_id_nombre", ["id", "nombre"])
    .index("by_prioridad", ["prioridad"]),
  usuarioRolEntorno: defineTable({
    idUsuario: v.id("usuarios"),
    idRol: v.id("roles"),
    idEntorno: v.id("entornos"),
  })
    .index("by_usuario", ["idUsuario"])
    .index("by_usuario_entorno", ["idUsuario", "idEntorno"]),
  usuarioXEntorno: defineTable({
    idUsuario: v.id("usuarios"),
    idEntorno: v.id("entornos"),
    enUso: v.boolean(),
    cantidadUsos: v.optional(v.float64()),
  })
    .index("by_usuario", ["idUsuario"])
    .index("by_entorno", ["idEntorno"])
    .index("by_usuario_entorno", ["idUsuario", "idEntorno"])
    .index("by_cantidad_usos", ["cantidadUsos"]),
});
