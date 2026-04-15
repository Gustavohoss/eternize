import couple1 from "../assets/couple1.png";
import couple2 from "../assets/couple2.png";

interface StatsProps {
  quantity: string;
  description: string;
}

export const Statistics = () => {
  const stats: StatsProps[] = [
    {
      quantity: "37.423",
      description: "Usuários Satisfeitos",
    },
  ];

  return (
    <section id="statistics" className="text-center py-12">
      <div className="grid grid-cols-1 gap-1">
        {stats.map(({ quantity, description }) => (
          <div key={description} className="space-y-2">
            <h2 className="text-4xl font-bold text-red-500">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}

        <div className="flex justify-center gap-1 text-yellow-400 text-3xl">
          {Array(5)
            .fill("★")
            .map((star, index) => (
              <span key={index}>{star}</span>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border p-4 rounded-lg shadow-lg bg-neutral-900 text-white">
            <img
              src={couple1}
              alt="Casal feliz"
              className="w-12 h-12 rounded-full mx-auto"
            />
            <p className="mt-4 text-lg italic">
              "Foi muito fácil de criar e fiquei espantada com o resultado,
              ficou muito bom!!!!!"
            </p>
          </div>

          <div className="border p-4 rounded-lg shadow-lg bg-neutral-900 text-white">
            <img
              src={couple2}
              alt="Casal apaixonado"
              className="w-12 h-12 rounded-full mx-auto"
            />
            <p className="mt-4 text-lg italic">
              "Meu namorado amooou! Uma surpresa inesquecível."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
