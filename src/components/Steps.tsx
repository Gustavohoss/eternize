import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Ícone para reforçar o passo a passo

interface StepProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const steps: StepProps[] = [
  {
    icon: <CheckCircleIcon className="h-6 w-6 text-red-500" />,
    title: "Criação da Página",
    description:
      "Preencha um formulário simples para criar uma página dedicada para alguém especial.",
  },
  {
    icon: <CheckCircleIcon className="h-6 w-6 text-red-500" />,
    title: "Pagamento Seguro",
    description:
      "Pague de maneira segura, seja via cartão de crédito ou PIX, com total tranquilidade.",
  },
  {
    icon: <CheckCircleIcon className="h-6 w-6 text-red-500" />,
    title: "Receba o Link e QR Code",
    description:
      "Após o pagamento, receba um link exclusivo e QR code para compartilhar sua surpresa.",
  },
  {
    icon: <CheckCircleIcon className="h-6 w-6 text-red-500" />,
    title: "Compartilhe o Amor",
    description:
      "Compartilhe o link ou QR code com quem você ama e faça uma surpresa inesquecível.",
  },
];

export const Steps = () => {
  return (
    <section
      id="steps" // Atualizado de "sponsors" para "steps"
      className="container pt-8 sm:pt-0 text-center" // Alterado para reduzir o espaçamento superior
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-10">
        Como Funciona?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {" "}
        {/* Alterado o gap para reduzir o espaçamento entre os itens */}
        {steps.map(({ icon, title, description }: StepProps) => (
          <div
            key={title}
            className="flex flex-col items-center text-center p-3 sm:p-4 border rounded-lg shadow-lg text-gray-400" // Alterado padding para diminuir o espaço interno
          >
            <span className="mb-4">{icon}</span>
            <h3 className="text-lg font-bold text-red-500">{title}</h3>
            <p className="text-white">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
