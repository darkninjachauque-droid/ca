"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Calculation } from "@/lib/types";
import { format } from "date-fns";
import { History, TrendingUp, TrendingDown } from "lucide-react";

type CalculationHistoryProps = {
  history: Calculation[];
};

export function CalculationHistory({ history }: CalculationHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <span>Histórico de Cálculos</span>
        </CardTitle>
        <CardDescription>
          Seus cálculos recentes são salvos aqui para referência.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Custo Total</TableHead>
                <TableHead className="text-right">Total GB</TableHead>
                <TableHead className="text-right">Preço/GB</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">Lucro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length > 0 ? (
                history.map((calc) => (
                  <TableRow key={calc.id}>
                    <TableCell>
                      {format(calc.createdAt, "dd/MM/yy HH:mm")}
                    </TableCell>
                    <TableCell className="text-right">
                      {calc.totalCost.toFixed(2)} MT
                    </TableCell>
                    <TableCell className="text-right">
                      {calc.totalGb}
                    </TableCell>
                    <TableCell className="text-right">
                      {calc.pricePerGb.toFixed(2)} MT
                    </TableCell>
                    <TableCell className="text-right">
                      {calc.revenue.toFixed(2)} MT
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={calc.profit >= 0 ? "default" : "destructive"}
                        className={calc.profit >= 0 ? "bg-green-600/20 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-transparent" : "bg-red-600/20 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-transparent"}
                      >
                         {calc.profit >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                        {calc.profit.toFixed(2)} MT
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Nenhum cálculo ainda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
