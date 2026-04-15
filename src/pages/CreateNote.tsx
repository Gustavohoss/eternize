// ARQUIVO: src/pages/CreateNote.tsx
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StepByStepForm from "@/components/create-note/StepByStepForm";
import { CarouselStyle } from "@/components/create-note/CarouselStyleSelector";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type BackgroundEffectType =
  | "hearts"
  | "confetti"
  | "stars"
  | "sunset"
  | "rain"
  | "forest"
  | "none"
  | "aurora"
  | "vortex"
  | "starsAndComets";
type Plan = "yearly" | "lifetime";

const CreateNote: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [titleColor, setTitleColor] = useState<string>("#ffffff");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [specialDate, setSpecialDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("#ffffff");
  const [richMessage, setRichMessage] = useState<string>("");
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [backgroundEffect, setBackgroundEffect] =
    useState<BackgroundEffectType>("none");
  const [customEmoji, setCustomEmoji] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<Plan>("lifetime");
  const [carouselStyle, setCarouselStyle] = useState<CarouselStyle>("default");
  const [dateCounterColor, setDateCounterColor] = useState<string>("#ea384c");
  const [isProcessing, setIsProcessing] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // --- LÓGICA DE SUBMISSÃO ATUALIZADA PARA KIRVANO ---
  const handleSubmit = async () => {
    // Validação dos campos
    if (!title.trim() || !slug.trim() || slug.length < 3) {
      toast({
        title: "Campos obrigatórios",
        description:
          "Por favor, preencha o título e o link (mínimo 3 caracteres).",
        variant: "destructive",
      });
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      toast({
        title: "E-mail inválido",
        description:
          "Por favor, insira um endereço de e-mail válido para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Salvar os dados diretamente no Supabase
      const { error: insertError } = await supabase.from("love_notes").insert({
        slug: slug,
        title: title,
        title_color: titleColor,
        message: richMessage || message,
        message_color: messageColor,
        rich_message: richMessage,
        images: imageUrls,
        special_date: specialDate,
        spotify_link: spotifyLink,
        background_effect: backgroundEffect,
        custom_emoji: customEmoji,
        background_color: backgroundColor,
        carousel_style: carouselStyle,
        date_counter_color: dateCounterColor,
        user_email: email,
        is_paid: false,
      });

      if (insertError) {
        if (insertError.code === "23505") {
          // Código para violação de chave única
          toast({
            title: "Link já existe",
            description:
              "Este link personalizado já está em uso. Por favor, escolha outro.",
            variant: "destructive",
          });
        } else {
          throw insertError;
        }
        setIsProcessing(false);
        return;
      }

      // 2. Definir o link de checkout da Kirvano com base nos links que você forneceu
      const kirvanoLinks = {
        lifetime:
          "https://pay.kirvano.com/420c12c0-1fb7-40f9-b410-320f0f894d44", // Plano Para Sempre
        yearly: "https://pay.kirvano.com/85188ec5-ed53-4583-b52b-19d6b790bbf2", // Plano Semestral/Anual
      };

      const checkoutUrl = kirvanoLinks[selectedPlan];

      // Adiciona o e-mail do cliente como parâmetro na URL para pré-preencher o checkout
      const finalUrl = `${checkoutUrl}?email=${encodeURIComponent(email)}`;

      // 3. Salva o slug na sessionStorage para usar na página de sucesso
      sessionStorage.setItem("loveNoteSuccessSlug", slug);

      // 4. Redireciona o usuário para o checkout da Kirvano
      window.location.href = finalUrl;
    } catch (error: any) {
      console.error("Erro ao processar a criação da nota:", error);
      toast({
        title: "Erro Inesperado",
        description: "Não foi possível iniciar o processo. Tente novamente.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-love-red mx-auto mb-6"></div>
          <h1 className="text-3xl font-bold mb-2">Preparando sua página...</h1>
          <p className="text-lg text-white/70">Aguarde um momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      <Header />
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-8">
        <div className="p-2 md:p-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF1A36] to-[#FF4C6B] text-transparent bg-clip-text text-center font-Poppins mb-8">
            Crie sua Mensagem de Amor
          </h1>
          <StepByStepForm
            title={title}
            setTitle={setTitle}
            titleColor={titleColor}
            setTitleColor={setTitleColor}
            images={images}
            setImages={setImages}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            specialDate={specialDate}
            setSpecialDate={setSpecialDate}
            message={message}
            setMessage={setMessage}
            messageColor={messageColor}
            setMessageColor={setMessageColor}
            richMessage={richMessage}
            setRichMessage={setRichMessage}
            spotifyLink={spotifyLink}
            setSpotifyLink={setSpotifyLink}
            backgroundEffect={backgroundEffect}
            setBackgroundEffect={setBackgroundEffect}
            customEmoji={customEmoji}
            setCustomEmoji={setCustomEmoji}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            slug={slug}
            setSlug={setSlug}
            email={email}
            setEmail={setEmail}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            carouselStyle={carouselStyle}
            setCarouselStyle={setCarouselStyle}
            dateCounterColor={dateCounterColor}
            setDateCounterColor={setDateCounterColor}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateNote;
