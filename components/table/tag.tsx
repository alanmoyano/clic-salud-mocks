import { Badge } from "@/components/ui/badge";
import type { Rol } from "@/types/users";

export function BadgeRoles({ roles }: { roles: Rol[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {roles.map((rol) => (
        <Badge key={rol} variant="secondary">
          {rol}
        </Badge>
      ))}
    </div>
  );
}
