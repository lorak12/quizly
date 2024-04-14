"use client";
import Heading from "@/components/Heading";
import Client from "@/app/admin/dashboard/quiz/[quizId]/components/Client";
import { useSearchParams } from "next/navigation";

function QuizPage() {
  const params = useSearchParams();
  const questionNum = Number(params.get("questionNum"));

  return (
    <div className="col-span-4 min-h-screen flex flex-col gap-8">
      <Heading title="Dodaj quiz" description="Utwórz swój quiz." />
      <Client questionNum={questionNum} />
    </div>
  );
}

export default QuizPage;
