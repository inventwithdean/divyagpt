"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, BrainCircuit, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Chat",
    icon: MessageSquare,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/chat",
  },
  {
    label: "Problem Solving",
    icon: BrainCircuit,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/problem-solving",
  },
];
export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Meet दिव्यGPT
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Elevate Your Learning Experience Through Engaging Questions.
        </p>
      </div>
      <div className="px-4 md:px-20 ld:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)}></tool.icon>
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
