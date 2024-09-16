import Heading from "@/components/Heading";
import prisma from "@/lib/prisma";
import Client from "../components/Client";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <Button>
          <Link href="/admin/dashboard/quiz/new">Dodaj nowy quiz</Link>
        </Button>
      </div>
      <Client quizzes={quizzes} />
    </div>
  );
}

export default Page;
