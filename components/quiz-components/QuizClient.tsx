"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { StatModal } from "../modals/statistic-modal";
import { CircleCheck, CircleX, SquareKanban } from "lucide-react";

interface QuizProps {
  quiz: any;
}

const QuizComponent: React.FC<QuizProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [lastQuestion, setLastQuestion] = useState<boolean>(false); // Dodajemy stan śledzący, czy użytkownik jest przy ostatnim pytaniu
  const [answered, setAnswered] = useState<boolean>(false); // Dodajemy stan śledzący, czy odpowiedź została już wybrana

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const onConfirm = async () => {
    try {
      setLoading(true);
      router.refresh();
      router.push("/quizzes");
    } catch (error) {
      toast({
        title: "Coś poszło nie tak.",
        description: "Przepraszamy za utrudnienia",
        variant: "destructive",
        action: <CircleX className="text-white" />,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const { toast } = useToast();

  useEffect(() => {
    if (currentQuestionIndex === quiz.questions.length - 1) {
      setLastQuestion(true);
    } else {
      setLastQuestion(false);
    }
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return; // Jeśli odpowiedź została już wybrana, zakończ funkcję

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers[answerIndex];

    if (selectedAnswer.isCorrect) {
      setCorrectAnswers((prevState) => prevState + 1);
      toast({
        title: "Odpowiedź poprawna",
        description: "Tak trzymaj",
        action: <CircleCheck className="text-green-500" />,
      });
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentQuestionIndex]);
      toast({
        title: "Odpowiedź niepoprawna",
        description: "Na pewno następnym razem się uda.",
        action: <CircleX className="text-red-500" />,
      });
    }

    setSelectedAnswer(answerIndex); // Zapisz wybraną odpowiedź
    setAnswered(true); // Oznacz, że odpowiedź została wybrana

    // Ustawienie opóźnienia przed wyświetleniem kolejnego pytania
    setWaiting(true);
  };

  const showNextQuestion = () => {
    setWaiting(false); // Wyłącz opóźnienie
    setAnswered(false); // Zresetuj flagę, że odpowiedź została wybrana
    setSelectedAnswer(null); // Zresetuj wybraną odpowiedź

    // Przejdź do następnego pytania
    if (lastQuestion) {
      setOpen(true); // Oznacz, że quiz został ukończony
      toast({
        title: "Quiz zakończony",
        description: "Poszło Ci świetnie 🥳",
        action: <SquareKanban />,
      });
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    return (
      <div className="relative col-span-4">
        <StatModal
          correctAnswers={correctAnswers}
          answers={quiz.questions.length}
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onConfirm}
          loading={loading}
        />
        {waiting && (
          <Button
            size="lg"
            onClick={showNextQuestion}
            className="min-w-[300px] h-20 text-xl fixed bottom-4 sm:left-4"
          >
            {lastQuestion ? "Zakończ quiz" : "Następne pytanie"}{" "}
            {/* Zmiana tekstu przycisku w zależności od ostatniego pytania */}
          </Button>
        )}
        <div className="col-span-4 flex flex-col items-center gap-6 min-h-[90vh] mt-10">
          <h2 className="text-2xl font-bold text-center">{quiz.title}</h2>
          <h2 className="text-xl text-muted-foreground sm:block hidden">
            {quiz.description}
          </h2>
          <div className="relative sm:w-[60%] w-full aspect-video">
            <Image
              src={`https://avatar.vercel.sh/${
                Math.random() * 1000 +
                  quiz.questions[currentQuestionIndex].question ?? ""
              }`}
              alt="Quiz picture"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
            <h2 className="text-xl text-muted-foreground">
              Wybierz prawidłową odpowiedź
            </h2>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              {currentQuestion.answers.map((answer: any, index: number) => (
                <Button
                  key={index}
                  size="lg"
                  variant={"outline"}
                  onClick={() => handleAnswerSelect(index)}
                  className={`min-w-[300px] h-20 text-xl  ${
                    selectedAnswer === index
                      ? answer.isCorrect
                        ? "bg-green-500 text-white hover:bg-green-500" // Poprawna odpowiedź
                        : "bg-red-500 text-white hover:bg-red-500" // Niepoprawna odpowiedź
                      : ""
                  }`}
                >
                  {answer.answer}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderQuestion();
};

export default QuizComponent;
