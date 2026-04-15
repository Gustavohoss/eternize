// Supondo que este arquivo esteja em: src/components/HeroCards.tsx
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";

export const HeroCards = () => {
  return (
    <div className="flex justify-center items-center gap-1 p-4">
      {[img1, img2, img3].map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Product image ${index + 1}`}
          className={
            `h-auto rounded-lg shadow-md transition-transform transform hover:scale-110 ` +
            (index === 1
              ? "w-[160px] md:w-[180px] lg:w-[200px]"
              : "w-[100px] md:w-[120px] lg:w-[140px]")
          }
        />
      ))}
    </div>
  );
};
