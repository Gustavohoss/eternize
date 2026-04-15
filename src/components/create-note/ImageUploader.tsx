
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Image, Loader2 } from 'lucide-react';
import { cropAndResizeImage } from '@/utils/imageUtils';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  imageUrls: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  imageUrls, 
  onImageUpload, 
  onRemoveImage 
}) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  
  // Handle file selection and processing
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProcessing(true);
      
      try {
        // Pass the event to the parent component
        onImageUpload(e);
      } catch (error) {
        console.error('Error processing images:', error);
        toast({
          title: "Erro no processamento",
          description: "Ocorreu um erro ao processar a imagem.",
          variant: "destructive",
        });
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="images" className="text-white mb-2 block">
        Fotos (Máximo 5)
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative aspect-[1080/1259] bg-black/20 rounded-lg overflow-hidden group">
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => onRemoveImage(index)}
              >
                ×
              </Button>
            </div>
          </div>
        ))}
        {imageUrls.length < 5 && (
          <label 
            className="aspect-[1080/1259] border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-love-red/50 transition-colors relative"
          >
            {processing ? (
              <Loader2 className="text-white/40 h-8 w-8 animate-spin" />
            ) : (
              <>
                <Image className="text-white/40 mb-2" />
                <span className="text-white/60 text-sm">Adicionar fotos</span>
                <span className="text-white/40 text-xs mt-2 px-4 text-center">
                  As imagens serão ajustadas para 1080x1259 pixels
                </span>
              </>
            )}
            <input
              type="file"
              id="images"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              disabled={processing}
            />
          </label>
        )}
      </div>
      <div className="text-white/60 text-xs space-y-1">
        <p>As fotos serão automaticamente cortadas para o tamanho ideal.</p>
        <p>O centro da imagem será mantido para preservar o conteúdo principal.</p>
      </div>
    </div>
  );
};

export default ImageUploader;
