"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  CircleCheck,
  CircleX,
  MoreHorizontal,
  ClipboardCheck,
  Trash,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteOpinion } from "@/app/actions/opinion";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function CellActions({ data }: { data: any }) {
  const quiz = data;

  const { toast } = useToast();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      deleteOpinion(id);
      router.refresh();
      toast({
        title: "Opinia usunięta.",
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
        onConfirm={() => onDelete(data.id)}
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
            Kopiuj opinion ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/admin/dashboard/opinions/${data.id}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Wyświetl
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
