import Heading from "@/components/Heading";
import Image from "next/image";

function Page() {
  return (
    <div className="col-span-4 flex flex-col gap-4">
      <Heading title="Dashboard" description="Nie wiem co tu dać" />
      <div className=" aspect-video relative">
        <Image
          src={"/silly.jpg"}
          alt="Silly cat image"
          fill
          priority
          quality={100}
          className="rounded-md"
        />
      </div>
    </div>
  );
}

export default Page;
