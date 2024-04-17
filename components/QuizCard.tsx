"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CardProps {
  data: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
  };
}

function handleDifficulty(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return (
        <span className="text-white px-2 py-1 rounded-sm bg-green-500">
          Łatwy
        </span>
      );
    case "medium":
      return (
        <span className="text-white px-2 py-1 rounded-sm bg-yellow-500 ">
          Średni
        </span>
      );
    case "hard":
      return (
        <span className="text-white px-2 py-1 rounded-sm bg-red-500 ">
          Trudny
        </span>
      );
    case "extreme":
      return (
        <span className="text-white px-2 py-1 rounded-sm bg-purple-800 ">
          Ekstremalny
        </span>
      );
    default:
      return <span>Brak</span>;
  }
}

function QuizCard(props: CardProps) {
  const router = useRouter();
  return (
    <Link href={`/quiz/${props.data.id}`}>
      <Card className="dark:border-none h-[55vh] relative overflow-hidden sm:justify-normal justify-between flex flex-col">
        <CardHeader>
          <div className="relative w-full sm:h-[300px] h-[160px]">
            <Image
              src={`https://avatar.vercel.sh/${
                props.data.description + props.data.title
              }`}
              alt="Logo"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardTitle>{props.data.title || "Brak Tytułu"}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <span>
              Poziom trudności: {handleDifficulty(props.data.difficulty)}
            </span>
            <br />
            <span className="line-clamp-2">
              {props.data.description || "..."}
            </span>
          </CardDescription>
        </CardContent>
        <CardFooter className="justify-between absolute bottom-0 right-0 sm:block hidden">
          <Button
            size={"lg"}
            className="gap-2 z-20"
            onClick={() => router.push(`/quiz/${props.data.id}`)}
          >
            Zagraj <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default QuizCard;
