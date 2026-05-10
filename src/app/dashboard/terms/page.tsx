import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Termos de Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert space-y-4 text-muted-foreground">
          <section>
            <h3 className="text-lg font-semibold text-foreground">1. Aceitação dos Termos</h3>
            <p>Ao utilizar o Calculador de Megas, você concorda em cumprir estes termos de serviço e todas as leis e regulamentos aplicáveis.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground">2. Uso do Serviço</h3>
            <p>Esta ferramenta é destinada exclusivamente para fins informativos e de cálculo. Os resultados são baseados nas entradas fornecidas pelo usuário. A precisão dos dados inseridos é de responsabilidade total do usuário.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground">3. Isenção de Responsabilidade</h3>
            <p>O Calculador de Megas não se responsabiliza por perdas financeiras decorrentes de decisões tomadas com base nos cálculos ou sugestões da IA. O consultor de IA fornece recomendações estratégicas, mas a decisão final cabe ao empreendedor.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground">4. Modificações</h3>
            <p>Reservamos o direito de revisar estes termos a qualquer momento, sem aviso prévio. Ao continuar a usar o site, você concorda com a versão mais atual dos termos.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
