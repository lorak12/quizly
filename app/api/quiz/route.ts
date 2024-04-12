import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

const answerSchema = z.object({
  answer: z.string().min(1, {
    message: "Odpowiedź musi mieć przynajmniej 1 znak!",
  }),
  isCorrect: z.boolean().default(false),
});

const questionSchema = z.object({
  question: z.string().min(5, {
    message: "Pytanie musi mieć przynajmniej 5 znaków!",
  }),
  answers: z.array(answerSchema),
});

const quizSchema = z.object({
  title: z.string().min(5, {
    message: "Tytuł musi mieć przynajmniej 5 znaków!",
  }),
  description: z.string().min(5, {
    message: "Opis musi mieć przynajmniej 5 znaków!",
  }),
  difficulty: z.string(),
  questions: z.array(questionSchema),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inputData = quizSchema.parse(body);

    // Tworzenie quizu wraz z pytaniami
    const createdQuiz = await prisma.quiz.create({
      data: {
        title: inputData.title,
        description: inputData.description,
        difficulty: inputData.difficulty,
        questions: {
          create: inputData.questions.map((question: any) => ({
            question: question.question,
            answers: {
              create: question.answers.map((answer: any) => ({
                answer: answer.answer,
                isCorrect: answer.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    return NextResponse.json(createdQuiz);
  } catch (error) {
    if (error instanceof ZodError) {
      // Obsługa błędów walidacji Zod
      console.error("Zod Validation Error:", error.errors);
      return new NextResponse(`Invalid input data. Error: ${error.message}`, {
        status: 400,
      });
    } else {
      // Obsługa innych błędów
      console.error("Server Error:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
