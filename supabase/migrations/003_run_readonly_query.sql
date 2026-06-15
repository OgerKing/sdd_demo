-- 003_run_readonly_query.sql
-- Read-only RPC for SQL Primer playground

CREATE OR REPLACE FUNCTION run_readonly_query(query text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  IF query IS NULL OR trim(query) = '' THEN
    RAISE EXCEPTION 'Query cannot be empty';
  END IF;

  IF query !~* '^\s*SELECT' THEN
    RAISE EXCEPTION 'Only SELECT queries are allowed';
  END IF;

  IF query ~* '\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|GRANT|REVOKE)\b' THEN
    RAISE EXCEPTION 'Only SELECT queries are allowed';
  END IF;

  EXECUTE format('SELECT COALESCE(jsonb_agg(row_to_json(t)), ''[]''::jsonb) FROM (%s) t', query)
    INTO result;

  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION run_readonly_query(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION run_readonly_query(text) TO anon;
GRANT EXECUTE ON FUNCTION run_readonly_query(text) TO authenticated;
