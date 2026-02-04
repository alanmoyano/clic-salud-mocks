import { getLoginUrl, type LoginParams } from "@/api/login";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { GlobeIcon, MonitorDownIcon } from "lucide-react";

export function LoginButton({
  entorno,
  cuil,
  backendLocal,
  frontendLocal,
}: LoginParams) {
  const actualizarCantidadUsos = useMutation(api.tasks.actualizarCantidadUsos);
  return (
    <Button
      variant="outline"
      nativeButton={false}
      disabled={!entorno || !cuil}
      onClick={() => {
        actualizarCantidadUsos({
          cuil,
        });
      }}
      render={
        <a
          href={getLoginUrl({ entorno, cuil, backendLocal, frontendLocal })}
          target="_blank"
          rel="noopener noreferrer"
        >
          {frontendLocal ? <MonitorDownIcon /> : <GlobeIcon />}
          Iniciar sesión en
          <strong>
            {entorno} {frontendLocal ? "local" : "desplegado"}
          </strong>
        </a>
      }
    />
  );
}
