// ARQUIVO: src/components/create-note/StepByStepForm.tsx
import React, { useState, useCallback, useMemo } from "react";
import TitleInput from "./TitleInput";
import TitleColorInput from "./TitleColorInput";
import ImageUploader from "./ImageUploader";
import MessageInput from "./MessageInput";
import DateCounter from "./DateCounter";
import SpotifyInput from "./SpotifyInput";
import BackgroundSelector from "./BackgroundSelector";
import SlugInput from "./SlugInput";
import EmailInput from "./EmailInput";
import LivePreview from "./LivePreview";
import CarouselStyleSelector, { CarouselStyle } from "./CarouselStyleSelector";
import PlanSelectionModal from "./PlanSelectionModal";
import { Button } from "../ui/button";
import { Crown } from "lucide-react";
import { cropAndResizeImage } from "../../utils/imageUtils";
import { useToast } from "../ui/use-toast";

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

interface StepByStepFormProps {
  title: string;
  setTitle: (title: string) => void;
  titleColor: string;
  setTitleColor: (color: string) => void;
  images: File[];
  setImages: (images: File[]) => void;
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  specialDate: string;
  setSpecialDate: (date: string) => void;
  message: string;
  setMessage: (message: string) => void;
  messageColor: string;
  setMessageColor: (color: string) => void;
  richMessage: string;
  setRichMessage: (richMessage: string) => void;
  spotifyLink: string;
  setSpotifyLink: (link: string) => void;
  backgroundEffect: BackgroundEffectType;
  setBackgroundEffect: (effect: BackgroundEffectType) => void;
  customEmoji: string;
  setCustomEmoji: (emoji: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  slug: string;
  setSlug: (slug: string) => void;
  email: string;
  setEmail: (email: string) => void;
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
  carouselStyle: CarouselStyle;
  setCarouselStyle: (style: CarouselStyle) => void;
  dateCounterColor: string;
  setDateCounterColor: (color: string) => void;
  onSubmit: () => void;
}

const StepByStepForm: React.FC<StepByStepFormProps> = (props) => {
  const {
    title,
    setTitle,
    titleColor,
    setTitleColor,
    images,
    setImages,
    imageUrls,
    setImageUrls,
    specialDate,
    setSpecialDate,
    message,
    setMessage,
    messageColor,
    setMessageColor,
    richMessage,
    setRichMessage,
    spotifyLink,
    setSpotifyLink,
    backgroundEffect,
    setBackgroundEffect,
    customEmoji,
    setCustomEmoji,
    backgroundColor,
    setBackgroundColor,
    slug,
    setSlug,
    email,
    setEmail,
    selectedPlan,
    setSelectedPlan,
    carouselStyle,
    setCarouselStyle,
    dateCounterColor,
    setDateCounterColor,
    onSubmit,
  } = props;

  const [currentStep, setCurrentStep] = useState(0);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const { toast } = useToast();
  const totalSteps = 8; // Total de 8 passos no formulário

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const filesArray = Array.from(e.target.files);
      const maxImages = selectedPlan === "lifetime" ? 8 : 4;

      if (images.length + filesArray.length > maxImages) {
        toast({
          title: "Limite de imagens",
          description: `Você pode enviar no máximo ${maxImages} fotos.`,
          variant: "destructive",
        });
        return;
      }

      try {
        const newImageFiles = [...images];
        const newImageUrls = [...imageUrls];
        for (const file of filesArray) {
          const croppedUrl = await cropAndResizeImage(file);
          newImageFiles.push(file);
          newImageUrls.push(croppedUrl);
        }
        setImages(newImageFiles);
        setImageUrls(newImageUrls);
      } catch (error) {
        toast({
          title: "Erro no processamento",
          description: "Ocorreu um erro ao processar uma imagem.",
          variant: "destructive",
        });
      }
    },
    [selectedPlan, images, imageUrls, setImages, setImageUrls, toast]
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      setImages((currentImages) => currentImages.filter((_, i) => i !== index));
      setImageUrls((currentImageUrls) => {
        URL.revokeObjectURL(currentImageUrls[index]);
        return currentImageUrls.filter((_, i) => i !== index);
      });
    },
    [setImages, setImageUrls]
  );

  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowPlanModal(false);
    onSubmit();
  };

  // Correção Definitiva: A lista de passos é memorizada com 'useMemo'.
  // Isto previne que os componentes dos passos sejam recriados em cada renderização,
  // mantendo o estado interno de cada um (incluindo o SlugInput).
  const formSteps = useMemo(
    () => [
      <div key="background" className="space-y-6 text-center">
        <h2 className="text-white text-2xl font-poppins font-medium">
          Escolha um fundo animado
        </h2>
        <p className="text-white/70">
          Selecione um efeito para o fundo da sua mensagem.
        </p>
        <BackgroundSelector
          {...{
            backgroundEffect,
            setBackgroundEffect,
            customEmoji,
            setCustomEmoji,
            backgroundColor,
            setBackgroundColor,
          }}
        />
      </div>,
      <div key="title" className="space-y-6 text-center">
        <h2 className="text-white text-2xl font-poppins font-medium">
          Qual será o título?
        </h2>
        <p className="text-white/70">
          Este será o título principal da sua mensagem.
        </p>
        <TitleInput {...{ title, setTitle }} />
        <TitleColorInput {...{ titleColor, setTitleColor }} />
      </div>,
      <div key="images" className="space-y-6 text-center">
        <h2 className="text-white text-2xl font-poppins font-medium">
          Adicione fotos especiais
        </h2>
        <p className="text-white/70">Adicione até 8 fotos para o carrossel.</p>
        <ImageUploader
          {...{
            imageUrls,
            onImageUpload: handleImageUpload,
            onRemoveImage: handleRemoveImage,
          }}
        />
        <CarouselStyleSelector
          value={carouselStyle}
          onChange={setCarouselStyle}
        />
      </div>,
      <div key="message" className="space-y-6 text-center">
        <h2 className="text-white text-2xl font-poppins font-medium">
          Escreva sua mensagem
        </h2>
        <p className="text-white/70">
          Uma mensagem carinhosa para expressar seus sentimentos.
        </p>
        <MessageInput
          {...{
            message,
            setMessage,
            messageColor,
            setMessageColor,
            richMessage,
            setRichMessage,
          }}
        />
      </div>,
      <div key="spotify" className="space-y-6 text-center">
        <h2 className="text-white text-2xl font-poppins font-medium">
          Escolha uma música
        </h2>
        <p className="text-white/70">
          Adicione uma música do Spotify que tocará na página.
        </p>
        <SpotifyInput {...{ spotifyLink, setSpotifyLink }} />
      </div>,
      <div key="date" className="space-y-6 text-center">
        <h2 className="text-white text-2xl font-poppins font-medium">
          Qual a data especial?
        </h2>
        <p className="text-white/70">
          Adicione uma data para mostrar há quanto tempo estão juntos.
        </p>
        <DateCounter
          {...{
            specialDate,
            setSpecialDate,
            dateCounterColor,
            setDateCounterColor,
            showCounter: true,
          }}
        />
      </div>,
      <div key="slug" className="space-y-6 text-center">
        <h2 className="text-white text-2xl font-poppins font-medium">
          Personalize o link
        </h2>
        <p className="text-white/70">
          Escolha um nome único para o endereço da sua mensagem.
        </p>
        <SlugInput {...{ slug, setSlug }} />
      </div>,
      <div key="email" className="space-y-6 text-center">
        <h2 className="text-white text-2xl font-poppins font-medium">
          Quase pronto! Para onde enviamos?
        </h2>
        <p className="text-white/70">
          Atenção: É fundamental que este seja o mesmo e-mail que você usará
          para concluir a sua compra. Assim, garantimos que o link e a
          confirmação sejam enviados sem atrasos para você.
        </p>
        <EmailInput {...{ email, setEmail }} />
      </div>,
    ],
    [
      // As dependências garantem que o useMemo só é recalculado quando necessário.
      backgroundEffect,
      setBackgroundEffect,
      customEmoji,
      setCustomEmoji,
      backgroundColor,
      setBackgroundColor,
      title,
      setTitle,
      titleColor,
      setTitleColor,
      imageUrls,
      handleImageUpload,
      handleRemoveImage,
      carouselStyle,
      setCarouselStyle,
      message,
      setMessage,
      messageColor,
      setMessageColor,
      richMessage,
      setRichMessage,
      spotifyLink,
      setSpotifyLink,
      specialDate,
      setSpecialDate,
      dateCounterColor,
      setDateCounterColor,
      slug,
      setSlug,
      email,
      setEmail,
    ]
  );

  const isLastStep = currentStep === totalSteps - 1;

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPlanModal(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-3/5">
          <div className="space-y-8">
            {/* Renderiza apenas o passo atual do array memorizado */}
            {formSteps[currentStep]}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
              {isLastStep ? (
                <div className="flex justify-center w-full">
                  <Button
                    onClick={handleNextStep}
                    className="bg-love-red/80 hover:bg-love-red text-white px-8 py-4 text-lg font-medium shadow-lg backdrop-blur-md font-Poppins"
                    size="lg"
                  >
                    <Crown className="mr-2" size={20} />
                    Escolher Plano
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="text-white border-gray-600 hover:bg-gray-800"
                  >
                    Anterior
                  </Button>
                  <span className="text-white text-sm">
                    {currentStep + 1} / {totalSteps}
                  </span>
                  <Button
                    onClick={handleNextStep}
                    className="bg-love-red hover:bg-love-red/90 text-white"
                  >
                    Próximo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <div className="sticky top-8">
            <LivePreview
              title={title}
              titleColor={titleColor}
              imageUrls={imageUrls}
              specialDate={specialDate}
              message={message}
              messageColor={messageColor}
              richMessage={richMessage}
              backgroundEffect={backgroundEffect}
              backgroundColor={backgroundColor}
              customEmoji={customEmoji}
              spotifyLink={spotifyLink}
              dateCounterColor={dateCounterColor}
              carouselStyle={carouselStyle}
            />
          </div>
        </div>
      </div>
      <PlanSelectionModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        onSelectPlan={handlePlanSelection}
      />
    </>
  );
};

export default StepByStepForm;
