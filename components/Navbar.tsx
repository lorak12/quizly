"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { LogIn, Menu, MessageCircleQuestion, UsersRound } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <NavigationMenu className="sm:block hidden">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Eksploruj</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Image
                        src={"/logo.png"}
                        alt="Quizly Logo"
                        width={100}
                        height={100}
                      />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Quizly
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Dynamiczna platforma umożliwiająca tworzenie oraz
                        rozwiązywanie pasjonujących quizów online.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/quizzes"
                  title="Quizy"
                  icon={<MessageCircleQuestion className="w-4 h-4" />}
                >
                  Eksploruj naszą szeroką bazę quizów.
                </ListItem>
                <ListItem
                  href="/about"
                  title="O Quizly"
                  icon={<UsersRound className="w-4 h-4" />}
                >
                  Twoje miejsce na pasjonujące quizy online i twórcze wyzwania!
                </ListItem>
                <ListItem
                  href="/admin/dashboard"
                  title="Logowanie"
                  icon={<LogIn className="w-4 h-4" />}
                >
                  Nie znalazłeś tego czego szukałeś? Stwórz własny!
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/quizzes" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Lista Quizów
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="sm:hidden block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Menu className="w-6  h-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Image
                          src={"/logo.png"}
                          alt="Quizly Logo"
                          width={100}
                          height={100}
                        />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Quizly
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Dynamiczna platforma umożliwiająca tworzenie oraz
                          rozwiązywanie pasjonujących quizów online.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem
                    href="/quizzes"
                    title="Quizy"
                    icon={<MessageCircleQuestion className="w-4 h-4" />}
                  >
                    Eksploruj naszą szeroką bazę quizów.
                  </ListItem>
                  <ListItem
                    href="/about"
                    title="O Quizly"
                    icon={<UsersRound className="w-4 h-4" />}
                  >
                    Twoje miejsce na pasjonujące quizy online i twórcze
                    wyzwania!
                  </ListItem>
                  <ListItem
                    href="/admin/dashboard"
                    title="Logowanie"
                    icon={<LogIn className="w-4 h-4" />}
                  >
                    Nie znalazłeś tego czego szukałeś? Stwórz własny!
                  </ListItem>
                </ul>
              </DialogContent>
            </Dialog>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex">
            <span className="mr-2">{icon}</span>
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
