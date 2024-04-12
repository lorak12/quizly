import QuizClient from "@/components/quiz-components/QuizClient";
import prisma from "@/lib/prisma";

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
    <>
      <QuizClient quiz={quiz} />
    </>
  );
}

export default Page;
