import { Migrations } from "@convex-dev/migrations";
import { components, internal } from "./_generated/api.js";
import type { DataModel } from "./_generated/dataModel.js";

export const migrations = new Migrations<DataModel>(components.migrations);
export const run = migrations.runner();

export const borrarCampoEnUso = migrations.define({
  table: "usuarioXEntorno",
  migrateOne: async (ctx, user) => {
    await ctx.db.delete(user._id);
  },
});

export const actualizarBorrarCampoEnUso = migrations.runner(
  internal.migrations.borrarCampoEnUso,
);
