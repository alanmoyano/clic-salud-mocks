import type { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const listaRoles = [
  "Efector",
  "Arquitectura",
  "Auditor",
  "Coordinador",
  "Inspector",
  "Administrador",
  "Protocolizador",
] as const;

export const roles: Record<Rol, { id: number; _id: Id<"roles"> }> = {
  Administrador: {
    id: 1,
    _id: "j975h2d75rbewcgsazh0vptq3n7ysda0" as Id<"roles">,
  },
  Efector: { id: 3, _id: "j979ct2h79mr9tztsehfnn77gs7yr7jr" as Id<"roles"> },
  Arquitectura: {
    id: 4,
    _id: "j9714vrd8wzb1ac29649s691p17ysr6b" as Id<"roles">,
  },
  Auditor: { id: 5, _id: "j9731g7bjn90gyd6r3xs5zf25h7yrq5d" as Id<"roles"> },
  Coordinador: {
    id: 6,
    _id: "j971gdjzwapygngs7tw0qmtzkx7ys02n" as Id<"roles">,
  },
  Inspector: { id: 7, _id: "j97d96em9fxkj3tm39r3dpvn6s7ys11w" as Id<"roles"> },
  Protocolizador: {
    id: 8,
    _id: "j97f76psxmretd2gykpv7k2wrs8019m1" as Id<"roles">,
  },
};

export const rolesEnum = z.enum(listaRoles);

export type Rol = z.infer<typeof rolesEnum>;

export function isRol(value: unknown): value is Rol {
  return rolesEnum.safeParse(value).success;
}

export const listaEntornos = ["dev", "test", "demo", "staging"] as const;

export const entornos: Record<Entorno, Id<"entornos">> = {
  dev: "jh7dszng4a4xjamb8ejfwy6my97yr0v8" as Id<"entornos">,
  test: "jh74nk0x1p66phxemt27c3zp3n7yr2ra" as Id<"entornos">,
  demo: "jh7369j42fkkgr3973885y6xsn7ysr8n" as Id<"entornos">,
  staging: "jh70epjmmfsy4ax5fswszjxehd7ysd4k" as Id<"entornos">,
};

export const entornosEnum = z.enum(listaEntornos);

export type Entorno = z.infer<typeof entornosEnum>;

export function isEntorno(value: unknown): value is Entorno {
  return entornosEnum.safeParse(value).success;
}

export const userSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  cuil: z.string(),
  roles: z.array(rolesEnum),
  entorno: entornosEnum,
  equipo: z.string(),
});

export type User = z.infer<typeof userSchema>;

export function isUser(value: unknown): value is User {
  const parsed = userSchema.safeParse(value);

  return parsed.success;
}

export function isUserArray(value: unknown): value is User[] {
  return Array.isArray(value) && value.every(isUser);
}

export const equipos = {
  desarrollo: 1,
  testing: 2,
  analisis: 3,
  VIP: 4,
  sinEquipo: 999_999,
} as const;

export type Equipo = (typeof equipos)[keyof typeof equipos];

export function isEquipo(value: unknown): value is Equipo {
  return Object.values(equipos).includes(value as Equipo);
}
