import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageCircle, Instagram, SquareTerminal } from "lucide-react"; // Importamos SquareTerminal para o TikTok

export const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mensagem de contato enviada!");
    alert("Mensagem enviada! Entraremos em contato em breve."); // Feedback simples
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      {/* Linha de separação - Adicionando margin-bottom */}
      <hr className="w-11/12 mx-auto border-gray-700 mb-10 sm:mb-16" />

      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h3 className="text-center text-4xl md:text-5xl font-bold text-white font-Poppins">
          Precisa de{" "}
          <span className="bg-gradient-to-r from-[#FF1A36] to-[#FF4C6B] text-transparent bg-clip-text">
            Ajuda?
          </span>
        </h3>

        {/* Subtítulo */}
        <p className="text-xl text-gray-400 text-center mt-4 mb-8 font-Poppins">
          Nosso time de suporte está pronto para te atender
        </p>

        <div className="flex flex-col items-center gap-6">
          {/* Formulário de Contato */}
          <form
            className="flex flex-col w-full max-w-lg gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Seu nome"
              className="bg-black border-2 border-gray-600 text-white focus:border-gray-400 focus:outline-none focus:ring-0 font-Poppins"
              aria-label="name"
            />
            <Input
              placeholder="Seu melhor e-mail"
              className="bg-black border-2 border-gray-600 text-white focus:border-gray-400 focus:outline-none focus:ring-0 font-Poppins"
              aria-label="email"
              type="email"
            />
            {/* Usando <textarea> nativo com estilos do Input */}
            <textarea
              placeholder="Como podemos ajudar?"
              className="flex h-24 w-full rounded-md border-2 border-gray-600 bg-black px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 font-Poppins resize-y"
              aria-label="message"
            ></textarea>
            <Button
              type="submit"
              className="mt-2 bg-gradient-to-r from-[#FF1A36] to-[#FF4C6B] hover:from-[#FF4C6B] hover:to-[#FF1A36] text-white font-Poppins"
            >
              Enviar Mensagem
            </Button>
          </form>

          {/* Divisor */}
          <div className="flex items-center w-full max-w-lg">
            <hr className="flex-grow border-gray-700" />
            <span className="px-4 text-gray-400 font-Poppins">
              Contato Rápido
            </span>
            <hr className="flex-grow border-gray-700" />
          </div>

          {/* Botões de Contato Direto */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full max-w-lg mx-auto">
            <Button
              className="flex items-center gap-2 py-6 border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-black font-semibold font-Poppins w-full sm:w-auto"
              onClick={() =>
                (window.location.href = "mailto:suporte.eternize@gmail.com")
              }
            >
              <Mail className="w-5 h-5" />
              E-mail
            </Button>

            <Button
              className="flex items-center gap-2 py-6 bg-green-600 hover:bg-green-700 text-white font-semibold font-Poppins w-full sm:w-auto"
              onClick={() =>
                window.open("https://wa.me/5538991466499", "_blank")
              }
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>

            {/* Botão para TikTok - Fundo preto, borda branca, e ícone branco */}
            <Button
              className="flex items-center gap-2 py-6 border-2 border-white text-white hover:bg-gray-800 bg-black font-semibold font-Poppins w-full sm:w-auto"
              onClick={() =>
                window.open("https://www.tiktok.com/@eternize.shop_", "_blank")
              }
            >
              <SquareTerminal className="w-5 h-5" />{" "}
              {/* Ícone SquareTerminal */}
              TikTok
            </Button>

            {/* Botão para Instagram - Gradiente original e link correto */}
            <Button
              className="flex items-center gap-2 py-6 border-2 text-white font-semibold font-Poppins w-full sm:w-auto"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #F9CE34, #EE2A7B, #6228D7)" /* Gradiente Instagram */,
                color: "white",
                borderColor: "#555", // Borda sutil para o gradiente
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(to right, #D9AD2A, #CC2367, #5022B3)" /* Hover um pouco mais escuro */,
                },
              }}
              onClick={() =>
                window.open(
                  "https://www.instagram.com/eternize.shop_",
                  "_blank"
                )
              }
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </Button>
          </div>
        </div>
      </div>

      {/* Linha de separação - Adicionando margin-top */}
      <hr className="w-11/12 mx-auto border-gray-700 mt-10 sm:mt-16" />
    </section>
  );
};
