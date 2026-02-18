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
import { History, TrendingUp, TrendingDown, X, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

type CalculationHistoryProps = {
  history: Calculation[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

export function CalculationHistory({ history, onDelete, onClearAll }: CalculationHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <span>Histórico de Cálculos</span>
          </CardTitle>
          <CardDescription>
            Seus cálculos recentes são salvos aqui para referência.
          </CardDescription>
        </div>
        {history.length > 0 && (
          <Button variant="destructive" size="sm" onClick={onClearAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            Limpar Histórico
          </Button>
        )}
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
                <TableHead className="text-right w-[50px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {history.length > 0 ? (
                  history.map((calc) => (
                    <motion.tr
                      key={calc.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
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
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDelete(calc.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Apagar</span>
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhum cálculo ainda.
                    </TableCell>
                  </TableRow>
                )}
                </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
