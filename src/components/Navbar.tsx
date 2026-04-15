import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "@/components/ui/Icons"; // Assuming LogoIcon is correctly imported from here

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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky border-b top-0 z-40 w-full bg-black text-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex items-center">
            {" "}
            {/* Added items-center here */}
            {/* Applied gradient and font styles to the span for "Eternize" text */}
            <a href="/" className="flex items-center gap-2">
              {" "}
              {/* Removed ml-4, font-bold, text-3xl, center, text-white from here */}
              <LogoIcon />
              <span className="text-3xl font-bold bg-gradient-to-r font-Poppins">
                Eternize
              </span>
            </a>
          </NavigationMenuItem>

          {/* Mobile */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="h-6 w-6 text-white" />
              </SheetTrigger>

              <SheetContent side="left">
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
                      onClick={() => setIsOpen(false)}
                      className={`${buttonVariants({
                        variant: "ghost",
                      })} text-white`}
                    >
                      {label}
                    </a>
                  ))}
                  <button
                    onClick={() =>
                      window.open("https://wa.me/5538991466499", "_blank")
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

          {/* Desktop */}
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

          <div className="hidden md:flex gap-2">
            <button
              onClick={() =>
                window.open("https://wa.me/5538991466499", "_blank")
              }
              className="flex items-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
