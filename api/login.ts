import type { Entorno } from "@/types/users";

type EntornoALoguear = Entorno | "local";

const BASE_URLS: Record<EntornoALoguear, string> = {
  local: "http://localhost:8083",
  dev: "http://172.16.18.237:8083",
  test: "https://rugepresatst.cidsfrcutn.tech",
  demo: "https://rugepresademo.cidsfrcutn.tech",
  staging: "https://clicsalud.test.cba.gov.ar",
};

const API_URLS: Record<EntornoALoguear, string> = {
  local: "rugepresa-api/login-alternativo-mock-cidi",
  dev: "rugepresa-api/login-alternativo-mock-cidi",
  test: "api/rugepresa-api/login-alternativo-mock-cidi",
  demo: "api/rugepresa-api/login-alternativo-mock-cidi",
  staging: "api/rugepresa-api/login-alternativo-mock-cidi",
};

export function getLoginUrl({
  entorno,
  frontendLocal,
  cuil,
  backendLocal = false,
}: {
  entorno: Entorno;
  cuil: string;
  frontendLocal: boolean;
  backendLocal?: boolean;
}) {
  const baseUrl = BASE_URLS[backendLocal ? "local" : entorno];

  const apiUrl = API_URLS[backendLocal ? "local" : entorno];

  const frontend = frontendLocal ? "local" : "desplegado";

  return `${baseUrl}/${apiUrl}/${frontend}/${cuil}/cookie`;
}
