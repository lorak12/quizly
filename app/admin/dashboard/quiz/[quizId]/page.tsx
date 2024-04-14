import QuizPage from "@/components/quiz-components/QuizPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizly - Add new quiz",
  description: "Add new quiz",
};

function Page() {
  return <QuizPage />;
}

export default Page;
