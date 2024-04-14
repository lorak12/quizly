"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const opinionSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).includes("@"),
  opinion: z.string().min(2),
});

export async function createOpinion(formData: z.infer<typeof opinionSchema>) {
  const inputData = opinionSchema.parse(formData);

  await prisma.opinion.create({
    data: {
      username: inputData.username,
      email: inputData.email,
      opinion: inputData.opinion,
    },
  });
  revalidatePath("/");
}

export async function deleteOpinion(id: string) {
  await prisma.opinion.delete({
    where: {
      id: id,
    },
  });
}
