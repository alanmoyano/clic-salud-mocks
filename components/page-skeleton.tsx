import { TableSkeleton } from "@/components/table/table-skeleton";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

function FiltersSkeleton() {
  return (
    <FieldSet className="w-full gap-4 pb-4">
      <FieldLegend>Filtros</FieldLegend>
      <FieldGroup>
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel>Entorno</FieldLabel>
            <Skeleton className="h-9 w-full" />
          </Field>
          <Field>
            <FieldLabel>Rol</FieldLabel>
            <Skeleton className="h-9 w-full" />
          </Field>
          <Field>
            <FieldLabel>Buscar</FieldLabel>
            <Skeleton className="h-9 min-w-xs" />
          </Field>
        </div>

        <Field className="col-span-2">
          <FieldLabel>Acciones</FieldLabel>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

export function PageSkeleton() {
  return (
    <>
      <FiltersSkeleton />
      <TableSkeleton />
    </>
  );
}
