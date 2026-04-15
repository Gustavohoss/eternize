// ARQUIVO: src/pages/ViewNote.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import Footer from "../components/Footer";
import BackgroundEffects from "../components/BackgroundEffects";
import ImageCarousel from "../components/ImageCarousel";
import MusicPlayer from "../components/MusicPlayer";
import DateTimeCounter from "../components/DateTimeCounter";
import { Heart, Share, Lock, QrCode } from "lucide-react"; // 1. IMPORTADO O ÍCONE
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // 2. IMPORTADO O DIALOG
import QRCode from "react-qr-code"; // 3. IMPORTADO O QR CODE
import { CarouselStyle } from "../components/create-note/CarouselStyleSelector";
import { supabase } from "../integrations/supabase/client";

// ... (o resto do seu código permanece igual até o componente)

const ViewNote: React.FC = () => {
  // ... (toda a lógica de state e useEffect permanece a mesma)
  const { slug } = useParams<{ slug?: string }>();
  const { toast } = useToast();
  const [noteData, setNoteData] = useState<LoveNoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchNoteData = async () => {
      if (!slug) {
        // Se não há slug, usar dados da sessão (preview)
        const storedData = sessionStorage.getItem("loveNotePreview");
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            setNoteData({
              title: parsedData.title,
              title_color: parsedData.titleColor,
              images: parsedData.images || [],
              special_date: parsedData.specialDate,
              message: parsedData.message,
              message_color: parsedData.messageColor,
              rich_message: parsedData.richMessage,
              spotify_link: parsedData.spotifyLink,
              background_effect: parsedData.backgroundEffect,
              custom_emoji: parsedData.customEmoji,
              background_color: parsedData.backgroundColor,
              carousel_style: parsedData.carouselStyle,
              date_counter_color: parsedData.dateCounterColor,
            });
            setIsPaid(true);
          } catch (error) {
            console.error("Error parsing preview data:", error);
          }
        }
        setLoading(false);
        return;
      }

      try {
        const { data: loveNoteData, error: noteError } = await supabase
          .from("love_notes")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (loveNoteData) {
          setIsPaid(loveNoteData.is_paid || false);

          if (loveNoteData.is_paid) {
            setNoteData({
              title: loveNoteData.title,
              title_color: loveNoteData.title_color || "#ffffff",
              images: Array.isArray(loveNoteData.images)
                ? loveNoteData.images
                : [],
              special_date: loveNoteData.special_date || "",
              message: loveNoteData.message || "",
              message_color: loveNoteData.message_color || "#ffffff",
              rich_message: loveNoteData.rich_message || "",
              spotify_link: loveNoteData.spotify_link || "",
              background_effect:
                (loveNoteData.background_effect as BackgroundEffectType) ||
                "hearts",
              custom_emoji: loveNoteData.custom_emoji || "",
              background_color: loveNoteData.background_color || "",
              slug: loveNoteData.slug,
              carousel_style:
                (loveNoteData.carousel_style as CarouselStyle) || "default",
              date_counter_color: loveNoteData.date_counter_color || "#ea384c",
            });
          } else {
            // Não está pago, mostrar dados limitados
            setNoteData({
              title: loveNoteData.title,
              title_color: "#ffffff",
              images: [],
              special_date: "",
              message: "Esta mensagem será carregada após o pagamento.",
              message_color: "#ffffff",
              rich_message: undefined,
              spotify_link: "",
              background_effect: "hearts" as BackgroundEffectType,
              custom_emoji: "",
              background_color: "",
              slug: loveNoteData.slug,
              carousel_style: "default" as CarouselStyle,
              date_counter_color: "#ea384c",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching note data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoteData();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: noteData?.title || "Mensagem de Amor",
          text: "Veja a mensagem especial que fiz para você!",
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência.",
      });
    }
  };

  const hasHtmlTags = (text: string | undefined): boolean => {
    if (!text) return false;
    return /<[a-z][\s\S]*>/i.test(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-love-red mx-auto mb-8"></div>
        <p className="text-white/70 text-xl">A carregar a sua mensagem...</p>
      </div>
    );
  }

  if (!noteData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <p className="text-white/70">Mensagem não encontrada.</p>
      </div>
    );
  }

  if (!isPaid && slug) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <BackgroundEffects effect="none" backgroundColor="#121212" />

        <main className="flex-grow container max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <div className="text-center p-8 bg-black/30 backdrop-blur-md rounded-lg border border-white/10">
            <Lock size={48} className="mx-auto mb-4 text-love-red" />
            <h1 className="font-serif text-3xl font-bold mb-4 text-white">
              Mensagem Bloqueada
            </h1>
            <p className="text-white/70 mb-6">
              Esta mensagem ainda não foi libertada. O pagamento está pendente.
            </p>
            <p className="text-white/50 text-sm">ID da mensagem: {slug}</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const displayMessage = noteData.rich_message || noteData.message;
  // Correção: Envolve a mensagem num div com a cor branca para garantir a cor padrão.
  const safeDisplayMessage = `<div style="color:white;">${displayMessage}</div>`;

  return (
    <div className="min-h-screen flex flex-col ">
      <BackgroundEffects
        effect={noteData.background_effect}
        emoji={noteData.custom_emoji}
        backgroundColor={noteData.background_color}
      />

      <main className="flex-grow container max-w-4xl mx-auto px-4 py-12">
        <div className="p-6 md:p-8 lg:p-12">
          {/* 4. BOTÕES DE COMPARTILHAMENTO ATUALIZADOS */}
          <div className="flex justify-end mb-4 gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <QrCode size={18} className="mr-2" />
                  QR Code
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black/90 border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Compartilhar com QR Code
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-center p-4">
                  <div className="bg-white p-4 rounded-lg">
                    <QRCode value={window.location.href} size={256} />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={handleShare}
            >
              <Share size={18} className="mr-2" />
              Partilhar
            </Button>
          </div>

          <h1
            className="font-serif text-3xl md:text-5xl font-bold mb-6 text-center"
            style={{ color: noteData.title_color || "#ffffff" }}
          >
            {noteData.title}
          </h1>

          <div className="flex flex-col items-center gap-8 mb-8">
            {noteData.images && noteData.images.length > 0 && (
              <div className="w-full max-w-md">
                <ImageCarousel
                  images={noteData.images}
                  style={noteData.carousel_style || "default"}
                  className="w-full"
                  showPagination={true}
                  showButtons={true}
                />
              </div>
            )}

            <div className="flex flex-col items-center justify-center w-full">
              <div
                className="font-serif text-lg text-center rich-message w-full"
                dangerouslySetInnerHTML={{ __html: safeDisplayMessage }}
              />

              {noteData.spotify_link && (
                <div className="mt-8 w-full max-w-md">
                  <MusicPlayer spotifyLink={noteData.spotify_link} />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center my-6">
            <Heart className="text-love-red animate-pulse" size={24} />
          </div>

          {noteData.special_date && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <DateTimeCounter
                startDate={noteData.special_date}
                counterColor={noteData.date_counter_color || "#ea384c"}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewNote;
