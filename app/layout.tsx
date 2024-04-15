import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ClerkProvider, SignOutButton, auth } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LogOut } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizly - Twoja platforma quizów",
  authors: [{ name: "@lorak12" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = auth();

  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className="overflow-x-hidden relative"
      >
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="py-2 px-4 flex gap-8 justify-between items-center border-b dark:border-none z-40">
              <div className="flex gap-8 items-center">
                <Link href={"/"} className="flex justify-center items-center">
                  <Image
                    src={"/logo.png"}
                    alt="Logo"
                    width={50}
                    height={50}
                    quality={10}
                    placeholder="blur"
                    blurDataURL="/logo.png"
                  />
                  <span className="text-2xl font-bold">Quizly</span>
                </Link>
                <Navbar />
              </div>
              <div className="flex justify-center items-center gap-4">
                <ThemeSwitcher />

                {user.userId ? (
                  <>
                    <div className="h-10 px-4 py-2 hidden sm:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
                      <SignOutButton>
                        <span>Wyloguj się</span>
                      </SignOutButton>
                    </div>
                    <div className="h-10 px-4 py-2 sm:hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">
                      <SignOutButton>
                        <LogOut className="w-6 h-6" />
                      </SignOutButton>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </nav>
            <main className="mt-8 mx-16 grid grid-cols-4 gap-4">
              {children}
              <SpeedInsights />
              <Analytics />
            </main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
