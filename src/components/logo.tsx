import { Calculator } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2">
        <Calculator className="h-5 w-5 text-primary" />
      </div>
      <h1 className="text-lg font-bold tracking-tight text-foreground">
        Calculador de Megas
      </h1>
    </div>
  );
}
