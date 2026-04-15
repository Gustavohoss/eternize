import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundEffects from '@/components/BackgroundEffects';
import ImageCarousel from '@/components/ImageCarousel';
import MusicPlayer from '@/components/MusicPlayer';
import DateTimeCounter from '@/components/DateTimeCounter';
import { CarouselStyle } from '@/components/create-note/CarouselStyleSelector';
import { Card } from '@/components/ui/card';
import { Copy } from 'lucide-react';

type BackgroundEffectType = 'hearts' | 'confetti' | 'stars' | 'sunset' | 'rain' | 'forest' | 'none' | 'aurora' | 'vortex' | 'starsAndComets';
type Plan = 'yearly' | 'lifetime';

interface LoveNoteData {
  title: string;
  titleColor: string;
  images: string[];
  specialDate: string;
  message: string;
  messageColor: string;
  spotifyLink: string;
  backgroundEffect: BackgroundEffectType;
  customEmoji?: string;
  backgroundColor?: string;
  slug?: string;
  plan?: Plan;
  carouselStyle?: CarouselStyle;
  dateCounterColor?: string;
}

const PreviewNote: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [noteData, setNoteData] = useState<LoveNoteData | null>(null);
  const webhookUrl = "https://rmznrafianrqxlefkjuu.supabase.co/functions/v1/payment-webhook";

  useEffect(() => {
    const storedData = sessionStorage.getItem('loveNotePreview');
    
    if (!storedData) {
      toast({
        title: "Dados não encontrados",
        description: "Não conseguimos encontrar os dados da sua mensagem.",
        variant: "destructive",
      });
      navigate('/create');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setNoteData(parsedData);
    } catch (error) {
      console.error('Failed to parse note data', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao carregar sua mensagem.",
        variant: "destructive",
      });
      navigate('/create');
    }
  }, [navigate, toast]);

  const handleEdit = () => {
    navigate('/create');
  };

  const handleConfirm = () => {
    toast({
      title: "Mensagem criada!",
      description: "Sua mensagem de amor foi criada com sucesso. Prosseguindo para o pagamento.",
    });
    
    // In a real application, this would redirect to a payment page
    // For now, we'll just navigate to the view page
    navigate('/view');
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: message,
    });
  };

  if (!noteData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-white/70">Carregando...</p>
      </div>
    );
  }

  const messageHasHtml = noteData.message.includes('<');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Importante: renderizamos o BackgroundEffects primeiro, permitindo que cor de fundo e emoji funcionem juntos */}
      <BackgroundEffects 
        effect={noteData.backgroundEffect} 
        emoji={noteData.customEmoji}
        backgroundColor={noteData.backgroundColor}
      />
      <Header />
      
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
        <div className="glass-card p-6 md:p-8 mb-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-center text-gradient">
            Pré-visualização da sua mensagem
          </h2>
          <p className="text-white/70 text-center mb-4">
            Veja como sua mensagem de amor vai ficar antes de finalizar.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={handleEdit} className="border-white/20 text-white hover:bg-white/10">
              Editar
            </Button>
            <Button className="bg-love-red hover:bg-love-red/90" onClick={handleConfirm}>
              Finalizar e Pagar
            </Button>
          </div>

          {noteData.slug && (
            <div className="mt-4 p-3 bg-white/5 rounded-md border border-white/10">
              <p className="text-center text-white/80 text-sm">
                <span className="font-medium">Link da sua mensagem:</span> eternize.com.br/
                <span className="text-love-red">{noteData.slug}</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-3 bg-white/5 rounded-md border border-white/10">
            <p className="text-center text-white/80 text-sm">
              <span className="font-medium">Plano selecionado:</span>{" "}
              {noteData.plan === 'lifetime' ? 
                <span className="text-love-red">Vitalício</span> : 
                <span className="text-love-red">Anual</span>
              }
            </p>
          </div>

          <Card className="mt-6 p-4 bg-black/20 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-2">Integração de Pagamento</h3>
            <p className="text-sm text-white/70 mb-4">
              Use esta URL de webhook no seu sistema de pagamento para liberar automaticamente o domínio após o pagamento.
            </p>
            
            <div className="flex items-center gap-2 p-2 bg-black/40 rounded-md">
              <div className="text-xs text-white/90 truncate flex-grow">
                {webhookUrl}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-white hover:bg-white/10"
                onClick={() => copyToClipboard(webhookUrl, "URL do webhook copiada!")}
              >
                <Copy size={14} />
              </Button>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-white mb-1">Payload exemplo:</h4>
              <div className="bg-black/40 p-2 rounded-md text-xs text-white/80">
                <pre>{`{
  "status": "completed",
  "reference": "ref_123456",
  "transaction_id": "tx_123456",
  "custom_data": {
    "slug": "${noteData.slug}"
  }
}`}</pre>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 h-6 text-xs text-white/70 hover:bg-white/10"
                onClick={() => copyToClipboard(
                  JSON.stringify({
                    status: "completed",
                    reference: "ref_123456",
                    transaction_id: "tx_123456",
                    custom_data: {
                      slug: noteData.slug
                    }
                  }, null, 2),
                  "Payload exemplo copiado!"
                )}
              >
                <Copy size={12} className="mr-1" /> Copiar payload
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="relative">
          <div className="p-6 md:p-8 relative z-10">
            <h1 
              className="font-serif text-3xl md:text-4xl font-bold mb-6 text-center" 
              style={{ color: noteData.titleColor || '#ffffff' }}
            >
              {noteData.title}
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {noteData.images.length > 0 && (
                <div className="flex justify-center">
                  <ImageCarousel 
                    images={noteData.images}
                    style={noteData.carouselStyle || 'default'} 
                    className="w-full md:max-w-lg"
                    showPagination={true}
                    showButtons={true}
                  />
                </div>
              )}
              
              {noteData.message && (
                <div className="font-serif text-lg mb-6 w-full text-center">
                  {messageHasHtml ? (
                    <div className="text-center" dangerouslySetInnerHTML={{ __html: noteData.message }} />
                  ) : (
                    <div className="text-center" style={{ color: noteData.messageColor }}>{noteData.message}</div>
                  )}
                </div>
              )}
              
              {noteData.spotifyLink && (
                <div className="mt-4 mb-8 w-full">
                  <MusicPlayer spotifyLink={noteData.spotifyLink} />
                </div>
              )}
            </div>

            {noteData.slug && (
              <div className="text-center text-white/60 text-sm my-3">
                eternize.com.br/{noteData.slug}
              </div>
            )}
            
            {noteData.specialDate && (
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <DateTimeCounter 
                  startDate={noteData.specialDate}
                  counterColor={noteData.dateCounterColor || "#ea384c"} 
                />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreviewNote;
