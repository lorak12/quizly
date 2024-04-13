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
import { CircleCheck, SendHorizontal } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { createOpinion } from "@/app/actions/opinion";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Nazwa użytkownika musi mieć przynajmniej 2 znaki!",
    })
    .max(50, {
      message: "Nazwa użytkownika może mieć maksymalnie 50 znaków!",
    }),
  email: z
    .string()
    .min(2, {
      message: "Email musi mieć przynajmniej 2 znaki!",
    })
    .includes("@", {
      message: "Email nie jest poprawny",
    }),
  opinion: z.string().min(2, {
    message: "Opinia musi mieć przynajmniej 2 znaki!",
  }),
});

function FAQForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      opinion: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Opinia została wysłana!",
      description: "Dziękujemy za ocenę",
      action: <CircleCheck className="text-green-500" />,
    });
    createOpinion(values);
    form.reset();
  }

  return (
    <div className="max-w-[50%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię i Nazwisko</FormLabel>
                <FormControl>
                  <Input placeholder="Jan Kowalski" {...field} />
                </FormControl>
                <FormDescription>
                  Podaj imię i nazwisko abyśmy wiedzieli kogo opinię
                  otrzymaliśmy.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jankowalski@gmail.com" {...field} />
                </FormControl>
                <FormDescription>Podaj swój email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="opinion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opinia</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tutaj wpisz swoją opinię" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="gap-2">
            Prześlij opinię
            <SendHorizontal className="w-4 g-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FAQForm;
