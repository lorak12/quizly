"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Tytuł musi mieć przynajmniej 5 znaków!",
  }),
  description: z.string().min(5, {
    message: "Opis musi mieć przynajmniej 5 znaków!",
  }),
  difficulty: z.string(),
  questions: z.array(
    z.object({
      question: z.string().min(5, {
        message: "Pytanie musi mieć przynajmniej 5 znaków!",
      }),
      answers: z.array(
        z.object({
          answer: z.string().min(1, {
            message: "Odpowiedz musi mieć przynajmniej 1 znak!",
          }),
          isCorrect: z.boolean().default(false),
        })
      ),
    })
  ),
});

export default function Client(props: {
  questionNum: number | undefined;
  initialData: any;
}) {
  const numIterations = 4;

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.initialData,
  });

  // Funkcja obsługująca wysyłkę formularza
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.patch(`/api/quiz/${props.initialData.id}`, values);
      toast({
        title: "Quiz został zaktualizowany!",
        description: "Wszystkie zmiany zostały zapisane!",
        action: <RefreshCcw />,
      });
      router.push("/admin/dashboard/quiz");
      router.refresh();
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      {!loading ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tytuł Quizu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sprawdz czy nadajesz się na profil matematyczny!"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Nazwij swój quiz.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dowiedz się czy masz predyspozycje na profil matematyczny."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Dodaj krótki opis na temat swoje quizu.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poziom Trudności</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz poziom trudności twojego quizu." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">Łatwy</SelectItem>
                      <SelectItem value="medium">Średni</SelectItem>
                      <SelectItem value="hard">Trudny</SelectItem>
                      <SelectItem value="extreme">Ekstremalny</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Powiedz użytkownikom jak trudny jest twój quiz.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {[...Array(props.questionNum)].map((_, question) => (
              <div
                className="border p-4 rounded-md flex flex-col gap-4 dark:border-none"
                key={question}
              >
                <FormField
                  control={form.control}
                  name={`questions.${question}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pytanie {question + 1}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Czy lubisz matematykę?"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Wpisz pytanie i zaznacz które odpowiedzi są poprawne
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div className="flex gap-8 justify-between w-full flex-col sm:flex-row">
                  {[...Array(numIterations)].map((_, answer) => {
                    return (
                      <FormField
                        key={answer}
                        control={form.control}
                        name={`questions.${question}.answers.${answer}.isCorrect`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center gap-2 w-full">
                            <FormLabel>Odpowiedź #{answer + 1}</FormLabel>
                            <div className="flex gap-2 h-16">
                              <FormControl>
                                <Checkbox
                                  className="mt-3"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormField
                                control={form.control}
                                name={`questions.${question}.answers.${answer}.answer`}
                                render={({ field }) => (
                                  <FormItem className="w-full">
                                    <FormControl>
                                      <Input
                                        placeholder="Odpowiedź"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormDescription>
                              Podaj{" "}
                              {answer === 0
                                ? "pierwszą"
                                : `kolejną, ${answer + 1}`}{" "}
                              odpowiedź w twoim Quizie.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            <Button type="submit">Gotowe</Button>
          </form>
        </Form>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}
