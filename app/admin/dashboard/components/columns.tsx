"use client";
import CellActions from "@/components/CellActions";
import { Button } from "@/components/ui/button";

import { Quiz } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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

export const columns: ColumnDef<Quiz>[] = [
  {
    id: "lp",
    header: "Lp.",
    cell: ({ row }) => <div className="capitalize">{row.index + 1}.</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tytuł
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-bold">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "difficulty",
    header: "Trudność",
    cell: ({ row }) => (
      <div className="capitalize">
        {handleDifficulty(row.getValue("difficulty"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Akcje",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
