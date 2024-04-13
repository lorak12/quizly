import Heading from "@/components/Heading";
import QuizList from "@/components/QuizList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizly - Lista quizów",
  description: "A sub-page for displaying all quizzes in our collection.",
};

function Page() {
  return (
    <>
      <div className="sm:col-span-2 col-span-4">
        <Heading
          title="Lista Quizów"
          description="Zanurz się w świat fascynujących quizów z Quizly! Niezależnie od tego, czy szukasz rozrywki czy chcesz sprawdzić swoją wiedzę, nasza platforma zapewnia wyzwania dla każdego."
        />
      </div>
      <div className="col-span-2"></div>

      <div className="col-span-4 mt-10">
        <QuizList />
      </div>
    </>
  );
}

export default Page;
