"use client";

import Heading from "@/components/heading";
import { Settings } from "lucide-react";
import React from "react";
import Empty from "@/components/empty";

const LearnPage = () => {
  return (
    <div>
      <Heading
        title="Settings"
        description="Under Development!"
        icon={Settings}
        iconColor="text-gray-900"
        bgColor="bg-gray-500/10"
      ></Heading>
      <Empty />
    </div>
  );
};

export default LearnPage;
