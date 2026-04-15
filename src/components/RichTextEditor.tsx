// ARQUIVO: src/components/create-note/RichTextEditor.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState("#ffffff");

  // Sincroniza o editor com o estado externo, mas evita re-renderizações desnecessárias
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && value !== editor.innerHTML) {
      editor.innerHTML = value;
    }
  }, [value]);

  // Guarda o conteúdo do editor sempre que há uma alteração.
  const saveContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Executa um comando de formatação no texto selecionado.
  const executeCommand = (
    command: string,
    commandValue: string | null = null
  ) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    saveContent();
  };

  // Lida com a mudança de cor.
  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    executeCommand("foreColor", color);
  };

  // Lida com a colagem de texto, garantindo que seja texto puro.
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="rich-text-editor border-2 border-white/10 rounded-md focus-within:border-love-red transition-all">
      <div className="bg-black/20 backdrop-blur-md rounded-t-md p-2 flex flex-wrap gap-1 border-b border-white/10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onMouseDown={(e) => e.preventDefault()} // Impede que o editor perca o foco
          onClick={() => executeCommand("bold")}
          className="h-8 px-2 text-white hover:bg-white/10"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("italic")}
          className="h-8 px-2 text-white hover:bg-white/10"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("underline")}
          className="h-8 px-2 text-white hover:bg-white/10"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="border-l border-white/10 mx-1"></div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              className="h-8 px-2 text-white hover:bg-white/10 gap-2"
            >
              <Palette className="h-4 w-4" />
              <div
                className="h-4 w-4 rounded-full border border-white/30"
                style={{ backgroundColor: currentColor }}
              ></div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-neutral-800 rounded-lg">
            {/* Correção para o tamanho do seletor de cor */}
            <div className="p-2">
              <Input
                type="color"
                value={currentColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-[80px] h-[80px] p-0 bg-transparent border-none cursor-pointer"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div
        ref={editorRef}
        onInput={saveContent}
        onBlur={saveContent}
        onPaste={handlePaste}
        contentEditable
        suppressContentEditableWarning={true}
        // A cor padrão é definida aqui para garantir que o texto seja sempre branco
        className="text-editor-area min-h-[150px] max-h-[300px] overflow-y-auto p-3 bg-black/40 backdrop-blur-md rounded-b-md outline-none text-white"
      />
    </div>
  );
};

export default RichTextEditor;
