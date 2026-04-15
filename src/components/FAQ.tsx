import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Como recebo minha página personalizada após o pagamento?",
    answer: "Após a confirmação do pagamento, você receberá um QR code e um link via email para compartilhar e acessar a página.",
    value: "item-1",
  },
  {
    question: "Quanto tempo leva para receber o QR Code por email?",
    answer: "Pagamentos com Cartão de Crédito e PIX são processados imediatamente, e você receberá seu QR Code logo após a confirmação do pagamento.",
    value: "item-2",
  },
  {
    question: "A página personalizada tem validade?",
    answer: "Sim, no plano básico, a página estará disponível por 1 ano. No plano avançado, a página será vitalícia.",
    value: "item-3",
  },
  {
    question: "O que está incluído na minha página personalizada?",
    answer: "Sua página personalizada contará com todas as informações preenchidas no formulário, incluindo fotos, mensagens e outros detalhes, conforme o plano escolhido.",
    value: "item-4",
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos pagamentos via Cartão de Crédito e Pix.",
    value: "item-5",
  },
  {
    question: "Como posso criar uma página personalizada?",
    answer: "Para criar sua página personalizada, basta preencher o formulário com as informações desejadas e seguir para o pagamento.",
    value: "item-6",
  },
  {
    question: "Como posso entrar em contato com o suporte ao cliente?",
    answer: "Você pode entrar em contato pelo nosso Instagram: @XXXXXXX ou pelo e-mail ADICIONAR@EMAIL.COM.",
    value: "item-7",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
        Perguntas Frequentes
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left text-gray-300 font-semibold py-4 border-b border-gray-700 hover:bg-gray-700 transition-all duration-300">
              {question}
            </AccordionTrigger>
            <AccordionContent className="bg-gray-800 text-gray-400 p-4 rounded-md">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-6 text-center text-gray-300">
        Ainda tem dúvidas?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-red-600 hover:border-b-2 hover:border-red-600 transition-all"
        >
          Entre em contato
        </a>
      </h3>
    </section>
  );
};
