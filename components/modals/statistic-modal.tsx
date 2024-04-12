"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface StatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  correctAnswers: number;
  answers: number;
}

export const StatModal: React.FC<StatModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  correctAnswers,
  answers,
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
      title="Gratulacje!"
      description={`Ukończyłeś quiz z ${correctAnswers}/${answers} poprawnymi odpowiedziami.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="default" onClick={onConfirm}>
          Kontynuuj
        </Button>
      </div>
    </Modal>
  );
};
