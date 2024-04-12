"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Quiz } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import {
  ArrowUpDown,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  Edit,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    cell: ({ row }) => {
      const quiz = row.original;

      const { toast } = useToast();

      const router = useRouter();

      const [loading, setLoading] = useState(false);
      const [open, setOpen] = useState(false);

      const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/quiz/${row.original.id}`);
          router.refresh();
          toast({
            title: "Quiz usunięty.",
            action: <CircleCheck className="text-green-500" />,
          });
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

      return (
        <>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Otwórz menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Akcje</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(quiz.id);
                  toast({
                    title: "Quiz ID został skopiowany",
                    action: <ClipboardCheck />,
                  });
                }}
              >
                Kopiuj quiz ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/admin/dashboard/edit/${row.original.id}`)
                }
              >
                <Edit className="mr-2 h-4 w-4" />
                Edytuj
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4 text-red-500" />
                Usuń
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
