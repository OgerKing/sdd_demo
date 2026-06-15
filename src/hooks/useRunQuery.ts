import { useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { validateSelectOnly } from "@/lib/queryGuard";

export type QueryRow = Record<string, unknown>;

export interface QueryResult {
  columns: string[];
  rows: QueryRow[];
  rowCount: number;
}

interface UseRunQueryState {
  loading: boolean;
  error: string | null;
  result: QueryResult | null;
}

function rowsToResult(rows: QueryRow[]): QueryResult {
  const columns =
    rows.length > 0 ? Object.keys(rows[0]).sort((a, b) => a.localeCompare(b)) : [];
  return { columns, rows, rowCount: rows.length };
}

function parseRpcError(message: string): string {
  if (message.includes("Only SELECT queries are allowed")) {
    return "Only SELECT queries are allowed. Mutating statements are not permitted.";
  }
  if (message.includes("Query cannot be empty")) {
    return "Query cannot be empty.";
  }
  return message;
}

export function useRunQuery() {
  const [state, setState] = useState<UseRunQueryState>({
    loading: false,
    error: null,
    result: null,
  });

  const runQuery = useCallback(async (sql: string) => {
    const validation = validateSelectOnly(sql);
    if (!validation.valid) {
      setState({ loading: false, error: validation.error ?? "Invalid query.", result: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.rpc("run_readonly_query", { query: sql });

    if (error) {
      setState({
        loading: false,
        error: parseRpcError(error.message),
        result: null,
      });
      return;
    }

    const rows = (Array.isArray(data) ? data : []) as QueryRow[];
    setState({ loading: false, error: null, result: rowsToResult(rows) });
  }, []);

  const clear = useCallback(() => {
    setState({ loading: false, error: null, result: null });
  }, []);

  return { ...state, runQuery, clear };
}
