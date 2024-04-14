import prisma from "@/lib/prisma";
import Client from "./components/Client";

async function Page() {
  const opinions = await prisma.opinion.findMany();

  return <Client opinions={opinions} />;
}

export default Page;
