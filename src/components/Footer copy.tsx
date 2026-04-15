// Footer.tsx
import { LogoIcon } from "@/components/ui/Icons";

const Footer = () => {
  return (
    <footer id="footer" className="bg-black text-white">
      <hr className="w-full border-gray-700" />

      <section className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-4">
            <LogoIcon />
            <span className="font-bold text-xl">XXXXXXXXX</span>
          </div>
          <p className="text-gray-400 text-center md:text-left">
            Transforme momentos especiais em memórias eternas.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Links</h3>
          <a href="#features" className="text-gray-400 hover:text-white transition">
            Recursos
          </a>
          <a href="#pricing" className="text-gray-400 hover:text-white transition">
            Planos
          </a>
          <a href="#testimonials" className="text-gray-400 hover:text-white transition">
            Depoimentos
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Contato</h3>
          <a href="mailto:contato@memoriasly.com" className="text-gray-400 hover:text-white transition">
            Email
          </a>
          <a href="https://wa.me/SEUNUMERO" className="text-gray-400 hover:text-white transition">
            WhatsApp
          </a>
          <a href="#faq" className="text-gray-400 hover:text-white transition">
            FAQ
          </a>
        </div>
      </section>

      <div className="container py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} XXXXXXXXXXX. Todos os direitos reservados.
      </div>
    </footer>
  );
};

// Exportação padrão
export default Footer;
