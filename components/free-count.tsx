"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModel } from "@/hooks/use-pro-model";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppinsLabel = Poppins({ weight: "400", subsets: ["latin"] });

interface FreeCounterProps {
  generations: number;
  maxGenerations: number;
}
const FreeCounter = ({ generations, maxGenerations }: FreeCounterProps) => {
  const proModel = useProModel();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  return (
    <div className={cn("px-3", poppinsLabel.className)}>
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {generations} / {maxGenerations} Generations Used
            </p>
            <Progress
              className="h-3"
              value={100 * (generations / maxGenerations)}
            />
          </div>
          <Button
            onClick={proModel.onOpen}
            className="w-full text-sm"
            variant="premium"
          >
            Buy Generations <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
