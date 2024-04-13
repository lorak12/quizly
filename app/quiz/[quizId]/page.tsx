import QuizClient from "@/components/quiz-components/QuizClient";
import prisma from "@/lib/prisma";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: { quizId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

  return {
    title: `Quiz - ${quiz?.title}`,
    description: quiz?.description,
  };
}

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
