import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="col-span-2 min-h-screen">
        <div className="flex justify-center flex-col gap-8 min-h-[50vh]">
          <h1 className="font-bold text-4xl text-left">
            Rozwijaj swoją wiedzę, baw się i zdobywaj <br /> nagrody z Quizly -{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary from-sky-400">
              Twoim źródłem wciągających quizów
            </span>{" "}
            online!
          </h1>
          <p className="text-muted-foreground max-w-[80%] text-left">
            Witaj w Quizly - miejscu, gdzie quizowanie staje się pasją! Odkryj
            naszą szeroką gamę quizów, stwórz własne pytania i rywalizuj z
            innymi. Dołącz do naszej społeczności i pozwól się wciągnąć w świat
            ciekawostek i zabawy!
          </p>
        </div>
      </section>
      <section className="col-span-2">
        <div className="relative h-full w-full">
          <Image fill src={"/logo.png"} alt="Hero section image" />
        </div>
      </section>
    </>
  );
}
