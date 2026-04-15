// src/components/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoIcon } from "@/components/ui/Icons"; // Verifique o caminho correto para o seu LogoIcon

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#features", label: "Recursos" },
  { href: "#testimonials", label: "Depoimentos" },
  { href: "#pricing", label: "Criar Página" },
  { href: "#faq", label: "Dúvidas" },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky border-b top-0 z-40 w-full bg-black text-white dark:border-b-slate-700 dark:bg-background">
      <nav className="container h-14 px-4 w-screen flex justify-between items-center mx-auto">
        {/* Logo e Título: APENAS UM LINK PRINCIPAL */}
        <div className="font-bold flex items-center">
          <Link to="/" className="flex items-center gap-2">
            {" "}
            {/* ESTE É O LINK PRINCIPAL */}
            <LogoIcon />
            {/* CORRIGIDO: Removido o <Link> aninhado. O SPAN SÓ CONTÉM O TEXTO. */}
            <span className="text-3xl font-bold bg-gradient-to-r from-[#FF1A36] via-[#FF4C6B] to-[#FF1A36] text-transparent bg-clip-text font-Poppins">
              Eternize
            </span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <span className="flex md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className="px-2">
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-neutral-900 border-gray-700"
            >
              <SheetHeader>
                <SheetTitle className="font-bold text-xl text-white">
                  Eternize
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col items-center gap-2 mt-4">
                {routeList.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} text-white`}
                  >
                    {label}
                  </a>
                ))}
                <button
                  onClick={() =>
                    window.open("https://wa.me/55SEUNUMEROAQUI", "_blank")
                  }
                  className="flex items-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </span>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2">
          {routeList.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className={`text-[17px] ${buttonVariants({
                variant: "ghost",
              })} text-white`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop Social/Contact Buttons */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() =>
              window.open("https://wa.me/55SEUNUMEROAQUI", "_blank")
            }
            className="flex items-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
