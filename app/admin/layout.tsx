import { checkRole } from "@/lib/utils";
import { Home, LineChart, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-10 flex-col border-r dark:border-none sm:flex mt-[67px] w-[200px] hidden">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 mt-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/dashboard/quiz"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageCircleQuestion className="h-4 w-4" />
                Quizy
              </Link>

              <Link
                href="/admin/dashboard/opinions"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Opinie
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="fixed inset-y-0 left-0 z-10 flex-col border-r dark:border-none flex mt-[67px] sm:hidden w-[57px]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 mt-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
              </Link>
              <Link
                href="/admin/dashboard/quiz"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageCircleQuestion className="h-4 w-4" />
              </Link>

              <Link
                href="/admin/dashboard/opinions"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="col-span-4 sm:ml-[200px] ml-[57px]">{children}</div>
    </>
  );
}

export default AdminLayout;
