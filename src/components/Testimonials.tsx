// src/components/Testimonials.tsx
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  comment: string;
  timeAgo: string;
}

// TODOS OS 12 DEPOIMENTOS RESTAURADOS
const testimonials: TestimonialProps[] = [
  {
    image: "/assets/couple1.png",
    name: "Mariana e João",
    comment:
      "Criei uma página surpresa para nosso aniversário de namoro. Quando João viu todas nossas fotos organizadas com nossas músicas favoritas, ele ficou emocionado. É incrível ter um lugar especial só nosso na internet!",
    timeAgo: "2 dias atrás",
  },
  {
    image: "/assets/couple2.png",
    name: "Ana e Pedro",
    comment:
      "Meu noivo adorou o presente! Fiz uma coleção dos nossos melhores momentos, desde aquela viagem desastrosa até os jantares românticos. Ele riu e se emocionou ao mesmo tempo!",
    timeAgo: "5 horas atrás",
  },
  {
    image: "/assets/couple3.png",
    name: "Lucas e Carol",
    comment:
      "Carol ficou tão feliz quando viu a página que fiz! Coloquei até a música que ela ama (aquela da Taylor Swift) e fotos dos nossos encontros. Ela disse que foi o presente mais pensado que já recebeu!",
    timeAgo: "1 dia atrás",
  },
  {
    image: "/assets/couple4.png",
    name: "Camila e Felipe",
    comment:
      "Estou tão contente de ter um lugar especial para guardar nossas memórias. Felipe e eu podemos voltar sempre que quisermos relembrar cada momento especial, onde quer que estejamos.",
    timeAgo: "3 dias atrás",
  },
  {
    image: "/assets/couple5.png",
    name: "Roberta e Marcos",
    comment:
      "Kkkk Marcos quase caiu da cadeira quando viu aquela foto nossa na chuva! Fiz uma página com nossos momentos mais engraçados e especiais. Ele adorou ver tudo organizado assim!",
    timeAgo: "1 semana atrás",
  },
  {
    image: "/assets/couple6.png",
    name: "Patrícia e Rodrigo",
    comment:
      "Rodrigo ficou surpreso quando viu nossa história contada dessa forma. Desde nossa primeira conversa até hoje, tudo organizado de um jeito que faz a gente valorizar cada momento juntos.",
    timeAgo: "2 dias atrás",
  },
  {
    image: "/assets/couple7.png",
    name: "Fernanda e Gustavo",
    comment:
      "Meu noivo não parava de sorrir! Fiz uma página com fotos e mensagens escondidas que ele foi descobrindo. No final tinha até um vídeo meu dizendo o quanto o amo!",
    timeAgo: "4 horas atrás",
  },
  {
    image: "/assets/couple8.png",
    name: "Juliana e Rafael",
    comment:
      "É maravilhoso saber que nossas memórias estão guardadas em um lugar especial. Rafael e eu podemos mostrar para nossos filhos no futuro como tudo começou!",
    timeAgo: "1 dia atrás",
  },
  {
    image: "/assets/couple9.png",
    name: "Beatriz e Thiago",
    comment:
      "Thiago adorou ver nossas fotos de viagem organizadas assim! Até coloquei aquela dele dormindo no aeroporto kkkk Foi tão fácil criar algo tão especial!",
    timeAgo: "3 dias atrás",
  },
  {
    image: "/assets/couple10.png",
    name: "Isabela e Daniel",
    comment:
      "Daniel ficou impressionado com o presente! Fiz uma linha do tempo do nosso relacionamento e ele não sabia que lembrava de tantos detalhes. Foi emocionante ver sua reação!",
    timeAgo: "6 dias atrás",
  },
  {
    image: "/assets/couple11.png",
    name: "Tatiane e Vinícius",
    comment:
      "Meu marido amou relembrar nossos momentos especiais dessa forma. É tão bom ter um lugar só nosso na internet, onde podemos guardar tudo o que é importante para nós dois.",
    timeAgo: "1 semana atrás",
  },
  {
    image: "/assets/couple12.png",
    name: "Gabriela e Lucas",
    comment:
      "Lucas ficou todo bobo quando viu a página que fiz! Coloquei desde fotos dos nossos primeiros encontros até mensagens carinhosas. Ele disse que foi o presente mais criativo que já recebeu!",
    timeAgo: "2 dias atrás",
  },
];

const TestimonialCard = ({
  image,
  name,
  comment,
  timeAgo,
}: TestimonialProps) => (
  <li className="mx-2 flex-shrink-0" style={{ width: "320px" }}>
    <Card className="h-full w-full rounded-2xl shadow-lg bg-neutral-900 text-white p-4 flex flex-col hover:bg-neutral-800 transition-colors duration-200">
      <CardContent className="text-sm flex-grow p-0">
        <p className="leading-snug">{comment}</p>
      </CardContent>
      <div className="flex items-center gap-3 text-xs text-gray-400 mt-4 pt-3 border-t border-white/10">
        <Avatar className="w-8 h-8">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-bold text-red-500">{name}</p>
          <p className="text-xs text-gray-300">{timeAgo}</p>
        </div>
      </div>
    </Card>
  </li>
);

const Testimonials = () => {
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 bg-black w-full overflow-hidden"
    >
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
          O Que Nossos Clientes Dizem
        </h2>

        <div className="flex flex-col gap-6">
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 animate-marquee hover:[animation-play-state:paused]">
              {extendedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`linha1-${index}`} {...testimonial} />
              ))}
            </ul>
          </div>

          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 animate-marquee-reverse hover:[animation-play-state:paused]">
              {extendedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`linha2-${index}`} {...testimonial} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
