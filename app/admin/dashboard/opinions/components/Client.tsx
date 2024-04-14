"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { supabase } from "@/lib/supabase";

function Client({ opinions }: { opinions: any }) {
  const [opinionsState, setOpinionsState] = useState(opinions);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-opinions")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "Opinion",
        },
        (payload) => {
          setOpinionsState(
            (prevOpinionsState: any) =>
              prevOpinionsState
                .filter((opinion: any) => opinion.id !== payload.old.id)
                .filter(Boolean) // Remove empty elements
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Opinion",
        },
        (payload) => {
          setOpinionsState([...opinionsState, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <DataTable columns={columns} data={opinionsState} filter="username" />
    </div>
  );
}

export default Client;
