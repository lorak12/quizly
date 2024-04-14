import { Protect } from "@clerk/nextjs";
import { Home, LineChart, Users, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Protect
      role="org:admin"
      fallback={
        <p>
          Nie masz odpowiednich uprawnień. Aby je uzyskać skontaktuj się z
          administratorem
        </p>
      }
    >
      <div className="fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex mt-[67px] w-[200px] ">
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
                href="/admin/dashboard/organization"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Organizacje
              </Link>
              <Link
                href="opinions"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Opinie
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="col-span-4 ml-[200px]">{children}</div>
    </Protect>
  );
}

export default AdminLayout;
