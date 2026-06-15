import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryEditor } from "@/components/QueryEditor";
import { ResultsTable } from "@/components/ResultsTable";
import { SchemaBrowser } from "@/components/SchemaBrowser";
import { useRunQuery } from "@/hooks/useRunQuery";
import { EXAMPLE_QUERIES } from "@/lib/exampleQueries";

const Index = () => {
  const [sql, setSql] = useState<string>(EXAMPLE_QUERIES[0].sql);
  const { loading, error, result, runQuery } = useRunQuery();

  const handleRun = () => {
    void runQuery(sql);
  };

  const handleExampleClick = (query: string) => {
    setSql(query);
    void runQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">SQL Primer</h1>
        <p className="text-sm text-muted-foreground">
          Learn SELECT queries against membership sample data
        </p>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[280px_1fr]">
        <aside>
          <SchemaBrowser />
        </aside>

        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Query Editor</CardTitle>
              <CardDescription>SELECT-only queries. Mutating statements are blocked.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_QUERIES.map((example) => (
                  <Badge
                    key={example.label}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => handleExampleClick(example.sql)}
                  >
                    {example.label}
                  </Badge>
                ))}
              </div>
              <QueryEditor value={sql} onChange={setSql} onRun={handleRun} loading={loading} />
            </CardContent>
          </Card>

          <ResultsTable result={result} error={error} loading={loading} />
        </section>
      </main>
    </div>
  );
};

export default Index;
