"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  DatabaseIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import FreeCounter from "./free-count";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },

  {
    label: "Chat",
    href: "/chat",
    icon: MessageSquare,
    color: "text-green-700",
  },
  {
    label: "Problem Solving",
    href: "/problem-solving",
    icon: BrainCircuit,
    color: "text-violet-500",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  generations: number;
  maxGenerations: number;
}

const Sidebar = ({ generations, maxGenerations }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full w-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center mb-14 pl-3">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo.png"></Image>
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            दिव्यGPT
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                route.href === pathname
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter generations={generations} maxGenerations={maxGenerations} />
    </div>
  );
};

export default Sidebar;
