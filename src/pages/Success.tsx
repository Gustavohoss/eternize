// ARQUIVO: src/pages/Success.tsx
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRCode from "react-qr-code";
import { Share2, ExternalLink, Copy, CheckCircle } from "lucide-react";

const Success: React.FC = () => {
  const [noteSlug, setNoteSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Pega o slug que salvamos na sessionStorage antes de ir para o pagamento
    const savedSlug = sessionStorage.getItem("loveNoteSuccessSlug");
    if (savedSlug) {
      setNoteSlug(savedSlug);
      // Limpa o sessionStorage para não ser usado de novo
      sessionStorage.removeItem("loveNoteSuccessSlug");
    }
  }, []);

  if (!noteSlug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-8"></div>
          <h1 className="text-4xl font-serif font-bold mb-4">
            Processando seu Pagamento...
          </h1>
          <p className="text-lg opacity-80">
            Você será redirecionado em breve.
          </p>
        </div>
      </div>
    );
  }

  const noteUrl = `${window.location.origin}/${noteSlug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(noteUrl);
    setCopied(true);
    toast({
      title: "Link copiado!",
      description:
        "O link da sua página foi copiado para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Uma mensagem especial para você!",
        url: noteUrl,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-900 to-black">
      <Header />
      <main className="flex-grow container max-w-2xl mx-auto px-4 py-8 flex items-center">
        <Card className="glass-card p-8 w-full text-center">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-4" />
            <h1 className="font-serif text-4xl font-bold mb-4 text-white">
              Pagamento Aprovado!
            </h1>
            <p className="text-white/80 text-lg">
              Sua página de amor está pronta! Pode levar alguns segundos para
              ser ativada.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-white text-xl font-medium">
                QR Code para Compartilhar
              </h3>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                  <QRCode value={noteUrl} size={192} />
                </div>
              </div>
              <p className="text-white/60 text-xs">
                Aponte a câmera do celular para o QR Code para abrir a mensagem.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-800 px-2 text-white/50">ou</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white text-xl font-medium">
                Seu Link Exclusivo
              </h3>
              <div className="flex items-center gap-2 bg-black/20 rounded-lg p-3 border border-white/10">
                <input
                  type="text"
                  value={noteUrl}
                  readOnly
                  className="flex-1 bg-transparent text-white text-sm border-none outline-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleShare}
                  className="flex-1 bg-love-red hover:bg-love-red/90"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(noteUrl, "_blank")}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir Minha Página
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
