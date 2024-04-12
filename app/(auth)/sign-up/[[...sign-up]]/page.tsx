import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="col-span-4 flex justify-center items-center min-h-screen">
      <SignUp />
    </div>
  );
}
