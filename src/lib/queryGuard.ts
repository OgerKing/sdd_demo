const MUTATING_KEYWORDS =
  /\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|GRANT|REVOKE)\b/i;

export function validateSelectOnly(sql: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = sql.trim();

  if (!trimmed) {
    return { valid: false, error: "Query cannot be empty." };
  }

  if (!/^\s*SELECT\b/i.test(trimmed)) {
    return {
      valid: false,
      error: "Only SELECT queries are allowed. Your query must start with SELECT.",
    };
  }

  if (MUTATING_KEYWORDS.test(trimmed)) {
    return {
      valid: false,
      error:
        "Only SELECT queries are allowed. Mutating statements (INSERT, UPDATE, DELETE, DROP, etc.) are not permitted.",
    };
  }

  return { valid: true };
}
