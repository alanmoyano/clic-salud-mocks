"use client";

import { getLoginUrl } from "@/api/login";
import { PageSkeleton } from "@/components/page-skeleton";
import { columns } from "@/components/table/columns";
import { UserTable } from "@/components/table/data-table";
import { TableSkeleton } from "@/components/table/table-skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import {
  isUserArray,
  listaEntornos,
  listaRoles,
  type Entorno,
  type Rol,
  type User,
} from "@/types/users";
import { useQuery } from "convex/react";
import { GlobeIcon, MonitorDownIcon } from "lucide-react";
import { parseAsBoolean, parseAsStringLiteral, useQueryState } from "nuqs";
import { Suspense, useState } from "react";
import { toast } from "sonner";

function getFilteredData(
  usuariosRolEntorno: User[],
  entorno: Entorno | null,
  rol: Rol | null,
) {
  let data = usuariosRolEntorno;
  if (entorno) {
    data = data.filter((usuario) => usuario.entorno === entorno);
  }
  if (rol) {
    data = data.filter((usuario) => usuario.roles.includes(rol));
  }
  return data ?? [];
}

export default function MainPage() {
  return (
    <main className="container mx-auto py-10">
      <Suspense fallback={<PageSkeleton />}>
        <Mocks />
      </Suspense>
    </main>
  );
}

export function Mocks() {
  const [entorno, setEntorno] = useQueryState(
    "entorno",
    parseAsStringLiteral(listaEntornos),
  );
  const [rol, setRol] = useQueryState("rol", parseAsStringLiteral(listaRoles));
  const [filtro, setFiltro] = useQueryState("filtro", {
    defaultValue: "",
  });
  const [backendLocal, setBackendLocal] = useQueryState(
    "backendLocal",
    parseAsBoolean.withDefault(false),
  );

  const [cuil, setCuil] = useState("");

  const usuariosRolEntorno = useQuery(api.tasks.getUsuariosRolEntorno);

  return (
    <>
      <FieldSet className="w-full gap-4 pb-4">
        <FieldLegend>Filtros</FieldLegend>
        <FieldGroup>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel>Entorno</FieldLabel>
              <Select
                value={entorno}
                onValueChange={(newValue) => setEntorno(newValue)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar entorno" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    <SelectItem value={null}>Todos</SelectItem>
                    {listaEntornos.map((entornoItem) => (
                      <SelectItem key={entornoItem} value={entornoItem}>
                        {entornoItem}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Rol</FieldLabel>
              <Select
                value={rol}
                onValueChange={(newValue) => setRol(newValue)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    <SelectItem value={null}>Todos</SelectItem>
                    {listaRoles.map((rolItem) => (
                      <SelectItem key={rolItem} value={rolItem}>
                        {rolItem}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Buscar</FieldLabel>
              <Input
                type="text"
                placeholder="Buscar por nombre o CUIL"
                value={filtro}
                onChange={(event) => setFiltro(event.target.value)}
                className="min-w-xs"
              />
            </Field>
          </div>

          <Field className="col-span-2">
            <FieldLabel>Acciones</FieldLabel>
            <div className="grid grid-cols-3 gap-4">
              <Dialog>
                <DialogTrigger
                  render={<Button>Iniciar sesión con un CUIL distinto</Button>}
                />
                <DialogContent className="min-w-fit">
                  <DialogHeader>
                    <DialogTitle>
                      Iniciar sesión con un CUIL distinto
                    </DialogTitle>
                    <DialogDescription>
                      Ingresá el CUIL del usuario y el entorno para iniciar
                      sesión.
                    </DialogDescription>

                    <FieldSet>
                      <FieldGroup>
                        <Field orientation="responsive">
                          <FieldLabel>Entorno</FieldLabel>
                          <Select
                            value={entorno}
                            onValueChange={(value) => setEntorno(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar entorno" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {listaEntornos.map((entornoItem) => (
                                  <SelectItem
                                    key={entornoItem}
                                    value={entornoItem}
                                  >
                                    {entornoItem}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field orientation="responsive">
                          <FieldLabel>CUIL</FieldLabel>
                          <InputOTP
                            maxLength={11}
                            value={cuil}
                            onChange={(nuevoTexto) => setCuil(nuevoTexto)}
                            pasteTransformer={(textoPegado) =>
                              textoPegado.replaceAll("-", "")
                            }
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                              <InputOTPSlot index={6} />
                              <InputOTPSlot index={7} />
                              <InputOTPSlot index={8} />
                              <InputOTPSlot index={9} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={10} />
                            </InputOTPGroup>
                          </InputOTP>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                  </DialogHeader>
                  <DialogFooter>
                    {entorno ? (
                      <>
                        <Button
                          variant="outline"
                          nativeButton={false}
                          disabled={!entorno || !cuil}
                          render={
                            <a
                              href={getLoginUrl({
                                entorno,
                                cuil,
                                frontendLocal: false,
                                backendLocal,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GlobeIcon />
                              Iniciar sesión en{" "}
                              <strong>{entorno} desplegado</strong>
                            </a>
                          }
                        />
                        <Button
                          variant="outline"
                          nativeButton={false}
                          disabled={!entorno || !cuil}
                          render={
                            <a
                              href={getLoginUrl({
                                entorno,
                                cuil,
                                frontendLocal: true,
                                backendLocal,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MonitorDownIcon />
                              Iniciar sesión en <strong>{entorno} local</strong>
                            </a>
                          }
                        />
                      </>
                    ) : (
                      <>Debes seleccionar un entorno</>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                onClick={() => {
                  toast.info("Próximamente…");
                }}
              >
                Representar a otro CUIL
              </Button>
              <Field orientation="horizontal">
                <Checkbox
                  id="backend-local"
                  checked={backendLocal}
                  onCheckedChange={(checked) => {
                    localStorage.setItem("backendLocal", checked.toString());
                    setBackendLocal(checked);
                  }}
                  className=""
                />
                <FieldLabel htmlFor="backend-local">
                  Usar backend local
                </FieldLabel>
              </Field>
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>
      {usuariosRolEntorno === undefined ? (
        <TableSkeleton />
      ) : !isUserArray(usuariosRolEntorno) ? (
        <div className="flex w-full place-content-center">
          La respuesta de la API no respetó el formato esperado.
        </div>
      ) : (
        <UserTable
          data={getFilteredData(usuariosRolEntorno ?? [], entorno, rol)}
          columns={
            !entorno
              ? columns
              : columns.filter((column) => column.header !== "Entorno")
          }
          globalFilter={filtro}
          setGlobalFilter={setFiltro}
          backendLocal={backendLocal}
        />
      )}
    </>
  );
}
