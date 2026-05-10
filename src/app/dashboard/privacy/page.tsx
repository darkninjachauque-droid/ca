import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Política de Privacidade e Direitos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <section>
            <h3 className="text-lg font-semibold text-foreground">Proteção de Dados</h3>
            <p>No Calculador de Megas, respeitamos sua privacidade. Não coletamos nem armazenamos informações pessoais identificáveis sem o seu consentimento. Os dados inseridos na calculadora são processados localmente e não são salvos permanentemente em nossos servidores públicos.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground">Cookies e Anúncios</h3>
            <p>Utilizamos cookies para melhorar sua experiência e para exibir anúncios relevantes através do Google AdSense. Esses anúncios nos ajudam a manter esta ferramenta gratuita para todos os usuários.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground">Seus Direitos</h3>
            <p>Você tem o direito de acessar o site de forma anônima e de limpar seu histórico de cálculos local a qualquer momento através do botão "Limpar Histórico" na página principal.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-foreground">Propriedade Intelectual</h3>
            <p>Todo o conteúdo original, design e marca são de propriedade da HelioTech Devs. É proibida a reprodução total ou parcial sem autorização prévia.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
