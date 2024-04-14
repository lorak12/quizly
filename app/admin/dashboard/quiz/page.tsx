import Heading from "@/components/Heading";
import prisma from "@/lib/prisma";
import AddButton from "@/components/quiz-components/AddButton";
import Client from "../components/Client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizly - Dashboard",
  description: "Dashboard for managing quizzes",
};

async function Page() {
  const quizzes = await prisma.quiz.findMany();

  return (
    <div className="col-span-4 min-h-screen gap-8 flex flex-col">
      <div className="flex justify-between items-center">
        <Heading
          title="Dashboard"
          description="Dodawaj, edytuj quizy dostępne w naszej platformie."
        />
        <AddButton />
      </div>
      <Client quizzes={quizzes} />
    </div>
  );
}

export default Page;
