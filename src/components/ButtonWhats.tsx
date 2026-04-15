import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const ButtonWhats = () => {
  const phoneNumber = "5551999999999"; // Substitua pelo número do WhatsApp
  const message = "Olá! Preciso de ajuda."; // Mensagem inicial

  const openWhatsApp = () => {
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
      style={{
        background: "linear-gradient(to right, #25D366, #128C7E)", // Cor do WhatsApp
        opacity: 0.9,
        width: "3rem",
        height: "3rem",
      }}
    >
      <MessageCircle className="h-5 w-5 text-white" />
    </Button>
  );
};
