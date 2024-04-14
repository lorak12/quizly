import { OpinionCard } from "@/components/OpinionCard";
import prisma from "@/lib/prisma";
import React from "react";

async function Page({ params }: { params: { opinionId: string } }) {
  const opinion = await prisma.opinion.findUnique({
    where: {
      id: params.opinionId,
    },
  });

  return (
    <div>
      <OpinionCard
        username={opinion?.username}
        id={opinion?.id ?? ""}
        email={opinion?.email}
        opinion={opinion?.opinion}
      />
    </div>
  );
}

export default Page;
