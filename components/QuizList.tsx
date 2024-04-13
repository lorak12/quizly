import QuizCard from "./QuizCard";
import prisma from "@/lib/prisma";

async function QuizList() {
  const quizzes = await prisma.quiz.findMany();

  return (
    <div className="grid sm:grid-cols-4 grid-cols-1 gap-4">
      {quizzes.map((x) => {
        return <QuizCard data={x} key={x.id} />;
      })}
    </div>
  );
}

export default QuizList;
