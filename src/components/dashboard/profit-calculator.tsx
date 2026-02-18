"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Calculation } from "@/lib/types";
import { Calculator } from "lucide-react";

const formSchema = z.object({
  totalGb: z.coerce
    .number({ invalid_type_error: "Deve ser um número" })
    .positive({ message: "Deve ser maior que 0" }),
  totalCost: z.coerce
    .number({ invalid_type_error: "Deve ser um número" })
    .positive({ message: "Deve ser maior que 0" }),
  pricePerGb: z.coerce
    .number({ invalid_type_error: "Deve ser um número" })
    .positive({ message: "Deve ser maior que 0" }),
});

type ProfitCalculatorProps = {
  onCalculate: (calculation: Calculation) => void;
};

export function ProfitCalculator({ onCalculate }: ProfitCalculatorProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalGb: "",
      totalCost: "",
      pricePerGb: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const revenue = values.totalGb * values.pricePerGb;
    const profit = revenue - values.totalCost;
    const newCalculation: Calculation = {
      id: uuidv4(),
      ...values,
      revenue,
      profit,
      createdAt: new Date(),
    };
    onCalculate(newCalculation);
    // Do not reset the form to allow for easy adjustments
  };
  
  const { totalGb, totalCost, pricePerGb } = form.watch();
  const isFormValid = form.formState.isValid;

  const calculatedRevenue = isFormValid ? Number(totalGb) * Number(pricePerGb) : 0;
  const calculatedProfit = isFormValid ? calculatedRevenue - Number(totalCost) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <span>Calculadora de Lucro</span>
        </CardTitle>
        <CardDescription>
          Insira os detalhes da sua compra e venda de dados para ver o lucro.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="totalGb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GBs Comprados</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custo Total (MT)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 230" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricePerGb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço de Venda / GB (MT)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 27" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">Lucro Total</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={calculatedProfit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl"
                >
                  {isFormValid ? calculatedProfit.toFixed(2) : "0.00"} MT
                </motion.div>
              </AnimatePresence>
              <p className="mt-2 text-xs text-muted-foreground">
                Receita: {isFormValid ? calculatedRevenue.toFixed(2) : "0.00"} MT
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Adicionar ao Histórico
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
