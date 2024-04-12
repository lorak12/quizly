"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { supabase } from "@/lib/supabase";

function Client(props: any) {
  const [quizzes, setQuizzes] = useState(props.quizzes);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-quizzes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Quiz",
        },
        (payload) => {
          setQuizzes([...quizzes, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, quizzes, setQuizzes]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-quizzes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Quiz",
        },
        (payload) => {
          setQuizzes([...quizzes, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, quizzes, setQuizzes]);

  return <DataTable columns={columns} data={quizzes} filter="title" />;
}

export default Client;
