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

export const rolesEnum = z.enum(listaRoles);

export type Rol = z.infer<typeof rolesEnum>;

export function isRol(value: unknown): value is Rol {
  return rolesEnum.safeParse(value).success;
}

export const listaEntornos = ["dev", "test", "demo", "staging"] as const;

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
});

export type User = z.infer<typeof userSchema>;

export function isUser(value: unknown): value is User {
  return userSchema.safeParse(value).success;
}

export function isUserArray(value: unknown): value is User[] {
  return Array.isArray(value) && value.every(isUser);
}
