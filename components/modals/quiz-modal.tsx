"use client";

import { FormEvent, useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  setQuestionNum: (questionNum: number) => void;
  questionNum: number;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  setQuestionNum,
  questionNum,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Podaj liczbę pytań"
      description="Podaj liczbę pytań w twoim quizie."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Liczba pytań
          </Label>
          <Input
            id="name"
            defaultValue="3"
            className="col-span-3"
            value={questionNum}
            onChange={(e: any) => setQuestionNum(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Anuluj
        </Button>
        <Button disabled={loading} variant="default" onClick={onConfirm}>
          Kontynuuj
        </Button>
      </div>
    </Modal>
  );
};
