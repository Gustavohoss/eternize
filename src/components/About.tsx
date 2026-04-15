import { Statistics } from "./Statistics";
//src\assets\couple1.png

export const About = () => {
  return (
    <section id="about" className="container py-8 sm:py-12">
      {/* Container principal */}
      <div className="relative text-white bg-black/70 p-6 rounded-lg border border-gray-600 backdrop-blur-md">
        {/* Fundo com estrelas */}
        <div className="absolute top-0 left-0 w-full h-full stars"></div>

        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 relative z-10">
          <div className="flex flex-col justify-between">
            <div className="pb-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-red-500 via-pink-500 to-red-700 text-transparent bg-clip-text">
                  Sobre o
                </span>{" "}
                <span className="bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">
                  Eternize
                </span>
              </h2>
              <p className="text-xl text-white mt-3">
                No Eternize, acreditamos que momentos especiais devem ser
                eternizados. Nossa plataforma permite que você crie um espaço
                único para homenagear alguém especial, seja um grande amor, um
                ente querido ou um amigo inesquecível. Com fotos, músicas e
                mensagens personalizadas, sua homenagem se torna uma lembrança
                eterna.
              </p>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
