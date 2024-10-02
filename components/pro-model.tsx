"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModel } from "@/hooks/use-pro-model";
import { Badge } from "./ui/badge";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { AiFillGolden } from "react-icons/ai";
import { GiSilverBullet } from "react-icons/gi";
import { IoMedal } from "react-icons/io5";
import { GiDiamonds } from "react-icons/gi";
import { GiAngelOutfit } from "react-icons/gi";

import { Card, CardContent, CardDescription } from "./ui/card";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
const poppinsHead = Poppins({ weight: "700", subsets: ["latin"] });
const poppinsLabel = Poppins({ weight: "400", subsets: ["latin"] });

const tools = [
  {
    label: "5 Generations for ₹15",
    color: "text-yellow-500",
    icon: IoMedal,
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "15 Generations for ₹40",
    color: "text-emerald-500",
    icon: GiSilverBullet,
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "50 Generations for ₹120",
    color: "text-violet-500",
    icon: AiFillGolden,
    bgColor: "bg-violet-500/10",
  },
  {
    label: "100 Generations for ₹200",
    color: "text-red-500",
    icon: GiDiamonds,
    bgColor: "bg-red-500/10",
  },
  {
    label: "600 Generations for ₹1000",
    color: "text-red-500",
    icon: GiAngelOutfit,
    bgColor: "bg-red-500/10",
  },
];

const ProModel = () => {
  const proModel = useProModel();
  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent className="bg-inherit">
        <DialogHeader>
          <DialogTitle className=" flex justify-center items-center flex-col gap-y-4 pb-2">
            <div
              className={cn(
                "flex items-center gap-x-2 py-1",
                poppinsHead.className
              )}
            >
              Buy Generations for दिव्यGPT
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center gap-x-2 justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={(cn("p-2 w-fit rounded-md"), tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6 m-2", tool.color)} />
                  </div>
                  <div className={cn(poppinsLabel.className)}>{tool.label}</div>
                </div>
                <Button
                  variant="default"
                  className={cn(poppinsLabel.className)}
                >
                  Buy Now
                </Button>
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProModel;
