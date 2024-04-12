import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function DELETE(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    if (!params.quizId) {
      return new NextResponse("Quiz id is required", { status: 400 });
    }

    // Rozpoczęcie transakcji
    await prisma.$transaction(async (tx) => {
      // Usunięcie odpowiedzi powiązanych z pytaniem związanych z danym quizem
      await tx.answer.deleteMany({
        where: {
          question: {
            quizId: params.quizId,
          },
        },
      });

      // Usunięcie pytań związanych z danym quizem
      await tx.question.deleteMany({
        where: {
          quizId: params.quizId,
        },
      });

      // Usunięcie quizu o podanym ID
      await tx.quiz.delete({
        where: {
          id: params.quizId,
        },
      });
    });

    return new NextResponse(
      "Quiz and associated questions and answers deleted successfully"
    );
  } catch (error) {
    console.error("Server Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const body = await req.json();
    const inputData = quizSchema.parse(body);

    // Aktualizacja quizu
    const updatedQuiz = await prisma.$transaction(async (tx) => {
      // Usuń stare pytania i odpowiedzi powiązane z quizem

      await tx.answer.deleteMany({
        where: {
          question: {
            quizId: params.quizId,
          },
        },
      });

      await tx.question.deleteMany({
        where: {
          quizId: params.quizId,
        },
      });

      // Aktualizuj dane quizu
      const updatedQuiz = await tx.quiz.update({
        where: {
          id: params.quizId,
        },
        data: {
          title: inputData.title,
          description: inputData.description,
          difficulty: inputData.difficulty,
        },
      });

      // Dodaj nowe pytania i odpowiedzi
      const newQuestions = await Promise.all(
        inputData.questions.map(async (question: any) => {
          const newQuestion = await tx.question.create({
            data: {
              question: question.question,
              quiz: {
                connect: { id: params.quizId },
              },
              answers: {
                create: question.answers.map((answer: any) => ({
                  answer: answer.answer,
                  isCorrect: answer.isCorrect,
                })),
              },
            },
            include: {
              answers: true,
            },
          });
          return newQuestion;
        })
      );

      // Zwróć zaktualizowany quiz wraz z nowymi pytaniami i odpowiedziami
      return {
        ...updatedQuiz,
        questions: newQuestions,
      };
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.error("Server Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
