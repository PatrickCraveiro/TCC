import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Item = { rotulo: string; valor: number };

/**
 * Barras horizontais ordenadas, série única (uma cor, sem legenda).
 * Rótulo e valor ficam em texto, então a lista também serve de tabela.
 */
export function BarrasRanqueadas({ itens, unidade }: { itens: Item[]; unidade: [string, string] }) {
  const ordenados = [...itens].sort((a, b) => b.valor - a.valor);
  const maximo = Math.max(1, ...ordenados.map((i) => i.valor));
  const total = ordenados.reduce((soma, i) => soma + i.valor, 0);
  const rotuloValor = (v: number) => `${v} ${v === 1 ? unidade[0] : unidade[1]}`;

  return (
    <ul className="space-y-3">
      {ordenados.map((item) => {
        const largura = (item.valor / maximo) * 100;
        const percentual = total ? Math.round((item.valor / total) * 100) : 0;
        return (
          <li key={item.rotulo}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  tabIndex={0}
                  aria-label={`${item.rotulo}: ${rotuloValor(item.valor)}`}
                  className="group grid grid-cols-[minmax(7rem,11rem)_1fr] items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <span className="truncate text-sm text-muted-foreground">{item.rotulo}</span>
                  <span className="flex h-6 items-center gap-2 border-l border-border">
                    {item.valor > 0 && (
                      <span
                        className="h-5 rounded-r-[4px] bg-chart-1 transition-opacity group-hover:opacity-80 group-focus-visible:opacity-80"
                        // Reserva espaço para o valor na ponta; nunca menos que 4px.
                        style={{ width: `max(4px, calc(${largura}% - 2.5rem))` }}
                      />
                    )}
                    <span className="text-sm font-medium tabular-nums">{item.valor}</span>
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <span className="font-semibold">{rotuloValor(item.valor)}</span>
                <span className="opacity-80"> · {percentual}% do total</span>
              </TooltipContent>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
}
