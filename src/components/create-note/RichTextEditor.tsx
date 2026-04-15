// src/components/create-note/RichTextEditor.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, Palette, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState("#ffffff");

  // Carrega o valor inicial no editor apenas uma vez
  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const executeCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    saveContent();
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    executeCommand("foreColor", color);
  };

  const handleEmojiSelect = (emoji: any) => {
    editorRef.current?.focus();
    executeCommand("insertText", emoji.native);
  };

  const saveContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    saveContent();
  };

  return (
    <div className="rich-text-editor border border-white/10 rounded-md focus-within:ring-2 focus-within:ring-love-red transition-all">
      <div className="bg-black/20 backdrop-blur-md rounded-t-md p-2 flex flex-wrap gap-1 border-b border-white/10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("bold")}
          className="h-8 px-2 text-white hover:bg-white/10"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("italic")}
          className="h-8 px-2 text-white hover:bg-white/10"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
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
              className="h-8 px-2 text-white hover:bg-white/10 gap-2"
            >
              <Palette className="h-4 w-4" />
              <div
                className="h-4 w-4 rounded-full border border-white/30"
                style={{ backgroundColor: currentColor }}
              ></div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none">
            <Input
              type="color"
              value={currentColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-16 p-1 bg-transparent border-none cursor-pointer"
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-white hover:bg-white/10"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 border-white/10 bg-black/80 backdrop-blur-lg w-[320px]">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="dark"
              set="native"
              previewPosition="none"
              skinTonePosition="none"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div
        ref={editorRef}
        className="text-editor-area min-h-[150px] max-h-[300px] overflow-y-auto p-3 bg-black/40 backdrop-blur-md rounded-b-md outline-none text-white"
        contentEditable
        onInput={saveContent}
        onPaste={handlePaste}
        // ESTILO ADICIONADO PARA CORRIGIR TEXTO INVERTIDO
        style={{ direction: "ltr" }}
      />
    </div>
  );
};

export default RichTextEditor;
