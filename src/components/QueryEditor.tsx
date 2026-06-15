import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface QueryEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  loading: boolean;
}

export function QueryEditor({ value, onChange, onRun, loading }: QueryEditorProps) {
  return (
    <div className="space-y-3">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="SELECT * FROM members LIMIT 5;"
        spellCheck={false}
        className="min-h-[160px] resize-y"
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            onRun();
          }
        }}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Ctrl+Enter to run</p>
        <Button onClick={onRun} disabled={loading}>
          {loading ? "Running…" : "Run"}
        </Button>
      </div>
    </div>
  );
}
