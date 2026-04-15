import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Removido CardFooter
import { Check, X } from "lucide-react";

interface PricingProps {
  title: string;
  price: string;
  oldPrice?: string;
  benefits: string[];
  missingBenefits?: string[];
  recommended?: boolean;
}

const pricingPlans: PricingProps[] = [
  {
    title: "Para Sempre",
    price: "R$ 27,00",
    oldPrice: "R$ 54,00",
    benefits: [
      "Texto dedicado",
      "Contador em tempo real",
      "Data de início",
      "QR Code exclusivo",
      "Máximo de 8 imagens",
      "Com música",
      "Fundo dinâmico",
      "Com animações exclusivas",
      "URL personalizada",
      "Suporte 24 horas",
    ],
    recommended: true,
  },
  {
    title: "Semestral",
    price: "R$ 17,00",
    oldPrice: "R$ 39,90",
    benefits: [
      "Texto dedicado",
      "Contador em tempo real",
      "Data de início",
      "QR Code exclusivo",
      "Máximo de 4 imagens",
      "Com música",
    ],
    missingBenefits: [
      "Fundo dinâmico",
      "Com animações exclusivas",
      "URL personalizada",
      "Suporte 24 horas",
    ],
  },
];

export const Pricing = () => {
  const navigate = useNavigate();

  // Função para navegar para a página de criação
  const handleCreatePageNavigation = () => {
    navigate("/create");
  };

  return (
    <section id="pricing" className="container py-8 sm:py-12 text-center">
      {/* Título principal com gradiente e fonte Poppins */}
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF1A36] via-[#FF4C6B] to-[#FF1A36] text-transparent bg-clip-text font-Poppins">
        Nossos Planos
      </h2>
      <p className="text-lg text-gray-300 mt-2 font-Poppins">
        Escolha o plano ideal para sua página personalizada.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {pricingPlans.map(
          (
            { title, price, oldPrice, benefits, missingBenefits, recommended },
            index
          ) => (
            <Card
              key={index}
              className={`relative p-6 rounded-xl shadow-lg border bg-neutral-900 text-white ${
                recommended ? "border-[#FF4C6B]" : "border-gray-800"
              }`}
            >
              {recommended && (
                <Badge className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FF1A36] text-white text-sm font-bold px-3 py-1 rounded-full font-Poppins">
                  ⭐ Recomendado
                </Badge>
              )}
              <CardHeader>
                {/* Título do plano com fonte Poppins */}
                <CardTitle className="text-2xl font-bold text-white font-Poppins">
                  {title}
                </CardTitle>
                {oldPrice && (
                  <p className="text-red-500 line-through font-Poppins">
                    {oldPrice}
                  </p>
                )}
                <p className="text-3xl font-bold text-[#FF4C6B] font-Poppins">
                  {price}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="mt-4 space-y-2 text-gray-300 text-sm font-Poppins">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="text-green-500" /> {benefit}
                    </li>
                  ))}
                  {missingBenefits?.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-500"
                    >
                      <X className="text-red-500" /> {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* CardFooter removido daqui para que os botões não apareçam em cada plano */}
            </Card>
          )
        )}
      </div>

      {/* Botão único para ir para a página de criação, localizado abaixo dos planos */}
      <div className="mt-10 flex justify-center">
        {" "}
        {/* flex justify-center para centralizar o botão */}
        <Button
          className="w-full max-w-sm py-3 bg-gradient-to-r from-[#FF1A36] to-[#FF4C6B] text-white font-bold rounded-lg hover:from-[#FF4C6B] hover:to-[#FF1A36] transition-all font-Poppins"
          onClick={handleCreatePageNavigation}
        >
          Criar Sua Página de Amor
        </Button>
      </div>
    </section>
  );
};
