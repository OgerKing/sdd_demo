import { SCHEMA_TABLES } from "@/integrations/supabase/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SchemaBrowser() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Schema</CardTitle>
        <CardDescription>Tables and columns available for queries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {SCHEMA_TABLES.map((table) => (
          <div key={table.name}>
            <p className="font-mono text-sm font-semibold">{table.name}</p>
            <ul className="mt-1 space-y-0.5 pl-2">
              {table.columns.map((column) => (
                <li key={column} className="font-mono text-xs text-muted-foreground">
                  {column}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
