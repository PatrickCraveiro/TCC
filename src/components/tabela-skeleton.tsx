import { Skeleton } from "@/components/ui/skeleton";

export function TabelaSkeleton({ colunas = 4, linhas = 6 }: { colunas?: number; linhas?: number }) {
  return (
    <div className="divide-y">
      {Array.from({ length: linhas }, (_, i) => (
        <div key={i} className="flex items-center gap-6 px-4 py-3.5">
          {Array.from({ length: colunas }, (_, j) => (
            <Skeleton key={j} className={j === 0 ? "h-4 flex-[2]" : "h-4 flex-1"} />
          ))}
        </div>
      ))}
    </div>
  );
}
