"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertModal } from "./modals/alert-modal";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteOpinion } from "@/app/actions/opinion";
import { CircleCheck, CircleX } from "lucide-react";

interface OpinionCardProps {
  id: string;
  username: string | undefined;
  email: string | undefined;
  opinion: string | undefined;
}

export function OpinionCard(props: OpinionCardProps) {
  const { toast } = useToast();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      deleteOpinion(id);
      router.refresh();
      router.push("/admin/dashboard/opinions");
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
        onConfirm={() => onDelete(props.id)}
        loading={loading}
      />
      <Card className="">
        <CardHeader>
          <CardTitle>Opinia użytkownika {props.username}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 flex-col">
          <p>Nazwa użytkownika: {props.username}</p>
          <p>Email: {props.email}</p>
          <p>Opinia: {props.opinion}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              router.push("/admin/dashboard/opinions");
            }}
          >
            Powrót
          </Button>
          <Button variant="destructive" onClick={() => setOpen(true)}>
            Usuń Opinię
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
