import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ClockIcon,
  MusicalNoteIcon,
  GlobeAltIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

interface FeatureProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: FeatureProps[] = [
  {
    title: "Contador de Tempo",
    description:
      "Mostre há quanto tempo vocês estão juntos com um contador em tempo real, exibindo anos, meses, dias, horas, minutos e segundos.",
    icon: <ClockIcon className="h-14 w-14 text-red-500" />,
  },
  {
    title: "Música Dedicada",
    description:
      "Dedique uma música especial que será reproduzida automaticamente na página.",
    icon: <MusicalNoteIcon className="h-14 w-14 text-pink-500" />,
  },
  {
    title: "Animações de Fundo",
    description:
      "Escolha entre várias animações de fundo para personalizar a página e torná-la única.",
    icon: <SparklesIcon className="h-14 w-14 text-yellow-500" />,
  },
  {
    title: "Acessível de Qualquer Lugar",
    description:
      "Crie sua página e compartilhe de qualquer lugar do mundo. Aceitamos pagamentos internacionais.",
    icon: <GlobeAltIcon className="h-14 w-14 text-blue-500" />,
  },
];

export const Features = () => {
  return (
    <section id="features" className="container py-16 sm:py-24 mt-6">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        {" "}
        <span className="text-red-500">Vários Recursos</span>
      </h2>

      <p className="text-lg text-gray-300 md:w-2/3 mx-auto text-center mt-4">
        Descubra as funcionalidades que tornarão sua homenagem ainda mais
        especial.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {features.map(({ title, description, icon }: FeatureProps) => (
          <Card
            key={title}
            className="text-center p-5 shadow-lg bg-neutral-900 text-white"
          >
            <CardHeader className="flex flex-col items-center">
              {icon}
              <CardTitle className="mt-3">{title}</CardTitle>
            </CardHeader>

            <CardContent className="text-gray-300 text-sm">
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
