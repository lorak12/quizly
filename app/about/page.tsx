import FAQForm from "@/components/FAQForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Quizly - O nas",
  description: "A page about Quizly",
};

function Page() {
  return (
    <>
      <section className="col-span-2 relative min-h-screen">
        <Image src={"/team-spirit.svg"} alt="Team spirit" fill />
      </section>
      <section className="col-span-2">
        <div className="flex justify-center flex-col gap-8">
          <h1 className="font-bold text-4xl text-left">
            Poznaj naszą historię:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary from-sky-400">
              Czym jest Quizly?
            </span>
          </h1>
          <p className="text-muted-foreground max-w-[80%] text-left">
            Witaj na Quizly - miejscu, które jest owocem pasji do uczenia się i
            rozwoju osobistego! Nasza platforma powstała z myślą o tych, którzy
            cenią sobie zarówno zabawę, jak i możliwość poszerzania swojej
            wiedzy. Od samego początku naszym celem było stworzenie miejsca,
            gdzie ludzie mogliby czerpać radość z rozwiązywania quizów na
            różnorodne tematy oraz tworzyć własne pytania, dzieląc się swoją
            wiedzą z innymi.
          </p>

          <p className="text-muted-foreground max-w-[80%] text-left">
            Dołącz już dziś do Quizly i przekonaj się, jak zabawa może iść w
            parze z nauką, tworząc niezapomniane doświadczenia edukacyjne i
            rozrywkowe!
          </p>
          <FAQForm />
        </div>
      </section>
    </>
  );
}

export default Page;
