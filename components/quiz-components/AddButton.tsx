"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { QuizModal } from "../modals/quiz-modal";
import { useRouter } from "next/navigation";

function AddButton() {
  const [questionNum, setQuestionNum] = useState(2);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const onClose = () => {
    setIsOpen(false);
  };
  const onConfirm = () => {
    setIsOpen(false);
    router.push(`/admin/dashboard/add-quiz?questionNum=${questionNum}`);
  };

  return (
    <>
      <QuizModal
        loading={loading}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        setQuestionNum={setQuestionNum}
        questionNum={questionNum}
      />
      <Button onClick={() => setIsOpen(true)}>Dodaj nowy quiz</Button>
    </>
  );
}

export default AddButton;
