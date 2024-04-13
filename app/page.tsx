import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="col-span-4 grid grid-cols-1 sm:grid-cols-4">
      <section className="sm:col-span-2 min-h-screen">
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
      <section className="sm:col-span-2">
        <div className="relative h-full flex justify-center items-center">
          <div className="glass w-full h-full transform-skew hidden sm:block">
            <div className="col-span-4 flex flex-col items-center gap-6 min-h-[90vh] mt-10">
              <h2 className="text-2xl font-bold">Quiz o Javascript</h2>
              <h2 className="text-xl text-muted-foreground">
                Sprawdź czy umiesz odpowiedzieć na te proste pytania.
              </h2>
              <div className="relative h-[400px] w-[60%]">
                <Image
                  src={`https://avatar.vercel.sh/${Math.random() * 1000}`}
                  alt="Quiz picture"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl font-bold">Co oznacza skrót DOM</h2>
                <h2 className="text-xl text-muted-foreground">
                  Wybierz prawidłową odpowiedź
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    variant={"outline"}
                    className="min-w-[300px] h-20 text-xl"
                  >
                    Document Object Model
                  </Button>
                  <Button
                    size="lg"
                    variant={"outline"}
                    className="min-w-[300px] h-20 text-xl"
                  >
                    Data Object Model
                  </Button>
                  <Button
                    size="lg"
                    variant={"outline"}
                    className="min-w-[300px] h-20 text-xl"
                  >
                    Dynamic Object Model
                  </Button>
                  <Button
                    size="lg"
                    variant={"outline"}
                    className="min-w-[300px] h-20 text-xl"
                  >
                    Document Objective Modal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
