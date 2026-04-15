import { Button } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { Heart } from "lucide-react"; // Ícone confiável
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate

const typingTexts = [
  "Alguém especial",
  "Seu amor",
  "Um familiar",
  "Seu amigo",
  "Quem você ama",
];

const Hero = () => {
  const navigate = useNavigate(); // Hook de navegação
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 800);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typingSpeed = 150;
    const deletingSpeed = 80;
    const pauseBetween = 3000;

    if (!isDeleting && charIndex < typingTexts[textIndex].length) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev + typingTexts[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === typingTexts[textIndex].length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseBetween);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % typingTexts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  // Função de navegação para /create com o parâmetro 'plan'
  const handleCreateNow = () => {
    const plan = "Para Sempre"; // Substitua com o plano selecionado
    navigate(`/create?plan=${plan}`);
  };

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      {/* Fundo de Estrelas */}
      <div className="stars"></div> {/* Fundo com estrelas animadas */}
      <div className="text-left space-y-6 z-10">
        <div className="min-h-[220px] flex flex-col justify-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
            Eternize
          </h1>

          <div className="relative">
            <h2
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#FF1A36] via-[#FF4C6B] to-[#FF1A36] text-transparent bg-clip-text leading-[1.15]"
              style={{
                paddingBottom: "0.35em",
                wordWrap: "break-word",
              }}
            >
              {currentText}
              <span
                className={`absolute ${
                  showCursor ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
                style={{
                  width: "6px",
                  height: "1.4em",
                  backgroundColor: "#FF1A36",
                  marginLeft: "4px",
                  bottom: "0.15em",
                  transform: "translateY(-2px)",
                }}
              />
            </h2>
          </div>
        </div>

        <p className="text-xl text-muted-foreground md:w-10/12 mt-8">
          Crie uma página única com fotos, músicas e mensagens especiais para
          celebrar aquela pessoa que merece todo seu carinho.
        </p>

        <div className="pt-8">
          <Button
            onClick={handleCreateNow} // Navegação para /create com o parâmetro do plano
            className="w-full md:w-1/3 py-6 px-12 bg-gradient-to-r from-[#FF1A36] to-[#FF4C6B] text-white rounded-lg font-semibold text-xl md:text-2xl flex items-center justify-center gap-3 hover:from-[#FF4C6B] hover:to-[#FF1A36] transition-all duration-300"
          >
            <Heart className="text-white w-6 h-6 md:w-7 md:h-7" />
            Criar Agora
          </Button>
        </div>
      </div>
      <div className="z-10">
        <HeroCards />
      </div>
    </section>
  );
};

export default Hero;
