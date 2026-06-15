import type { QueryResult } from "@/hooks/useRunQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsTableProps {
  result: QueryResult | null;
  error: string | null;
  loading: boolean;
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function ResultsTable({ result, error, loading }: ResultsTableProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          {loading
            ? "Executing query…"
            : error
              ? "Query failed"
              : result
                ? `${result.rowCount} row${result.rowCount === 1 ? "" : "s"} returned`
                : "Run a query to see results"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {!error && result && result.rowCount > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                {result.columns.map((col) => (
                  <TableHead key={col} className="font-mono text-xs">
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.rows.map((row, i) => (
                <TableRow key={i}>
                  {result.columns.map((col) => (
                    <TableCell key={col} className="font-mono text-xs">
                      {formatCell(row[col])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={result.columns.length} className="text-muted-foreground">
                  {result.rowCount} row{result.rowCount === 1 ? "" : "s"}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}

        {!error && result && result.rowCount === 0 && (
          <p className="text-sm text-muted-foreground">Query returned no rows.</p>
        )}

        {!error && !result && !loading && (
          <p className="text-sm text-muted-foreground">
            Write a SELECT query and click Run, or try an example below.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
