import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Code, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Sobre o Calculador de Megas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            O <strong>Calculador de Megas</strong> nasceu da necessidade de simplificar a vida dos revendedores de dados em Moçambique. Nossa missão é fornecer uma ferramenta precisa e fácil de usar para que você possa focar no que realmente importa: crescer o seu negócio.
          </p>
          <div className="grid gap-6 mt-8 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Code className="h-4 w-4 text-accent" />
                Tecnologia de Ponta
              </div>
              <p className="text-sm">
                Desenvolvido com as tecnologias mais modernas (Next.js, React e IA) pela <strong>HelioTech Devs</strong>, garantindo rapidez e confiabilidade.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Rocket className="h-4 w-4 text-accent" />
                Visão de Futuro
              </div>
              <p className="text-sm">
                Queremos ser a plataforma número 1 para gestão de pequenos negócios digitais, integrando inteligência artificial para otimizar seus lucros.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desenvolvedor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Este projeto é mantido pela <strong>HelioTech Devs</strong>. Somos apaixonados por criar soluções que impactam positivamente a economia local através da tecnologia.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
