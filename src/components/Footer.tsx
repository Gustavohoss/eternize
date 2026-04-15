import { LogoIcon } from "@/components/ui/Icons";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-black text-white font-Poppins">
      <hr className="w-full border-gray-700" />

      <section className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-4">
            <LogoIcon />
            <span className="font-bold text-xl text-gradient-love">
              Eternize
            </span>{" "}
          </div>
          <p className="text-gray-400 text-center md:text-left">
            Transforme seus momentos mais preciosos em memórias digitais,
            eternamente vivas e cheias de afeto!
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Navegue</h3>
          <a
            href="#features"
            className="text-gray-400 hover:text-white transition"
          >
            Recursos Incríveis
          </a>
          <a
            href="#pricing"
            className="text-gray-400 hover:text-white transition"
          >
            Nossos Planos
          </a>
          <a
            href="#testimonials"
            className="text-gray-400 hover:text-white transition"
          >
            Quem Já Amou
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Fale Conosco</h3>

          <a
            href="mailto:suporte.eternize@gmail.com" // E-mail de suporte
            className="text-gray-400 hover:text-white transition"
          >
            E-mail
          </a>
          <a
            href="https://wa.me/5538991466499" // Whatsapp com DDI Brasil
            className="text-gray-400 hover:text-white transition"
          >
            WhatsApp
          </a>
          <a
            href="https://www.tiktok.com/@eternize.shop_" // Link do TikTok
            className="text-gray-400 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer" // Para abrir em nova aba e por segurança
          >
            TikTok
          </a>
          <a
            href="https://www.instagram.com/eternize.shop_" // Link do Instagram
            className="text-gray-400 hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer" // Para abrir em nova aba e por segurança
          >
            Instagram
          </a>
          <a href="#faq" className="text-gray-400 hover:text-white transition">
            Dúvidas Frequentes
          </a>
        </div>
      </section>

      <div className="container py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://www.vortexdigital.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          VortexDigital
        </a>
        . Todos os direitos reservados, com muito carinho e amor!
      </div>
    </footer>
  );
};

export default Footer;
