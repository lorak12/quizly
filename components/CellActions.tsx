"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import {
  CircleCheck,
  CircleX,
  MoreHorizontal,
  ClipboardCheck,
  Edit,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "./modals/alert-modal";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

function CellActions({ data }: { data: any }) {
  const quiz = data;

  const { toast } = useToast();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/quiz/${data.id}`);
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
            onClick={() => router.push(`/admin/dashboard/edit/${data.id}`)}
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
}

export default CellActions;
