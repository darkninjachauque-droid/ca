"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock email sent
    console.log(values);
    toast({
      title: "Link de recuperação enviado!",
      description: "Por favor, verifique seu e-mail para redefinir sua senha.",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Esqueceu sua senha?</CardTitle>
        <CardDescription>
          Não se preocupe! Insira seu e-mail e enviaremos um link para redefinir sua senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Enviar link de recuperação
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Lembrou sua senha?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
