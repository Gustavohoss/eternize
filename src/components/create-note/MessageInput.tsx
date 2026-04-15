
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RichTextEditor from './RichTextEditor';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  messageColor: string;
  setMessageColor: (color: string) => void;
  richMessage: string;
  setRichMessage: (richMessage: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  messageColor,
  setMessageColor,
  richMessage,
  setRichMessage
}) => {
  const handleEmojiSelectSimple = (emoji: any) => {
    setMessage(message + emoji.native);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="message" className="text-white text-lg font-medium">
        Sua Mensagem Especial
      </Label>
      
      <Tabs defaultValue="rich" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-black/20">
          <TabsTrigger value="rich">Editor Avançado</TabsTrigger>
          <TabsTrigger value="simple">Editor Simples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rich" className="mt-0">
          <div className="mb-2">
            <p className="text-white/70 text-sm mb-2">
              Use o editor avançado para formatar sua mensagem com diferentes estilos e cores.
            </p>
            <RichTextEditor 
              value={richMessage} 
              onChange={setRichMessage} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="simple" className="mt-0">
          <div className="mb-2">
            <p className="text-white/70 text-sm mb-2">
              Editor simples com uma cor única para todo o texto.
            </p>
            <div className="relative">
              <Textarea
                id="message"
                placeholder="Escreva uma mensagem especial..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-black/40 border-white/10 text-white min-h-[150px] backdrop-blur-md pr-12"
              />
              <div className="absolute bottom-2 right-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full h-8 w-8 bg-black/30 border-white/10 text-white hover:bg-white/10"
                    >
                      <Smile size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border-white/10 bg-black/80 backdrop-blur-lg w-[320px]" side="top">
                    <Picker 
                      data={data}
                      onEmojiSelect={handleEmojiSelectSimple}
                      theme="dark"
                      set="native"
                      previewPosition="none"
                      skinTonePosition="none"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor="messageColor" className="text-white mb-2 block text-sm">
                Cor do Texto
              </Label>
              <div className="flex items-center space-x-4">
                <RadioGroup 
                  value={messageColor} 
                  onValueChange={setMessageColor}
                  className="flex flex-wrap gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="#ea384c" id="color-red" className="border-love-red text-love-red" />
                    <Label htmlFor="color-red" className="text-love-red">Vermelho</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="#FFDEE2" id="color-pink" className="border-love-pink text-love-pink" />
                    <Label htmlFor="color-pink" className="text-love-pink">Rosa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="#E5DEFF" id="color-purple" className="border-love-purple text-love-purple" />
                    <Label htmlFor="color-purple" className="text-love-purple">Lilás</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="#ffffff" id="color-white" className="border-white text-white" />
                    <Label htmlFor="color-white" className="text-white">Branco</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessageInput;
