"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function InputMascara({
  mascara,
  defaultValue,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
  mascara: (valor: string) => string;
}) {
  const [valor, setValor] = useState(() => mascara(String(defaultValue ?? "")));
  return <Input {...props} value={valor} onChange={(e) => setValor(mascara(e.target.value))} />;
}
