"use client";

import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bot, Lightbulb, Loader2, DollarSign, Sparkles, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { getAiSuggestions, type AIFormState } from "@/app/actions/ai";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const formSchema = z.object({
  costPerGb: z.coerce.number().positive("Custo por GB deve ser positivo."),
  desiredProfitMarginPercentage: z.coerce
    .number()
    .min(0, "A margem não pode ser negativa.")
    .max(100, "A margem não pode ser superior a 100."),
  currencySymbol: z.string().default("MT"),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
    >
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Obter Sugestões
    </Button>
  );
}

export function AIAdvisor() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      costPerGb: undefined,
      desiredProfitMarginPercentage: 20,
      currencySymbol: "MT",
    },
  });
  
  const initialState: AIFormState = { data: null, error: null, message: "" };
  const [state, formAction] = useFormState(getAiSuggestions, initialState);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Erro da IA",
        description: state.error,
      });
    }
  }, [state.error, toast]);
  
  useEffect(() => {
    if(state.data) {
        form.reset();
    }
  }, [state.data, form.reset]);


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <Bot className="mr-2 h-4 w-4" />
          Consultor de Lucro IA
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Consultor de Lucro IA
          </SheetTitle>
          <SheetDescription>
            Obtenha preços de venda ideais e dicas usando IA para maximizar
            seus ganhos.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
        {state.data ? (
            <div className="space-y-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5" />
                    Preço de Venda Sugerido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {state.data.suggestedSellingPricePerGb.toFixed(2)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">{state.data.explanation.match(/([A-Z]{2,3}|[$€£])/)?.[0] || 'MT'}/GB</span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{state.data.explanation}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5" />
                    Dicas de Estratégia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {state.data.optimalStrategyTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Button onClick={() => state.data = null} variant="outline" className="w-full">Fazer outra consulta</Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                action={formAction}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="costPerGb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Custo por GB (MT)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 23" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desiredProfitMarginPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Margem de Lucro Desejada (%)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <input type="hidden" name="currencySymbol" value="MT" />
                {state.error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                )}
                <SheetFooter className="pt-4">
                  <SubmitButton />
                </SheetFooter>
              </form>
            </Form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
