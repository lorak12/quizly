import prisma from "@/lib/prisma";
import React from "react";
import Client from "./components/update-form";

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
