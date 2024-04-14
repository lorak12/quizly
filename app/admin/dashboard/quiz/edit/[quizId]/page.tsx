import prisma from "@/lib/prisma";
import Client from "./components/update-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizly - Edit quiz",
  description: "Edit the quiz",
};

async function Page({ params }: { params: { quizId: string } }) {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: params.quizId,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  return (
    <div className="col-span-4 min-h-screen flex flex-col gap-8">
      <Client questionNum={quiz?.questions.length} initialData={quiz} />
    </div>
  );
}

export default Page;
