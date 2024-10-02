"use client";

import axios from "axios";
import Heading from "@/components/heading";
import { BrainCircuit } from "lucide-react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import formSchema from "./constants";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import DivyaAvatar from "@/components/divya-avatar";
import Markdown from "react-markdown";

import { Poppins } from "next/font/google";
import { useProModel } from "@/hooks/use-pro-model";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

interface ChatMessage {
  role: string;
  parts: [{ text: string }];
}

const ConversationPage = () => {
  const proModel = useProModel();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  // Documentation
  // https://ai.google.dev/gemini-api/docs/text-generation?lang=node
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userMessage = { role: "user", parts: [{ text: values.prompt }] };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/problem-solving", newMessages);
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModel.onOpen();
      }
    } finally {
      router.refresh();
    }
  }
  const isLoading = form.formState.isSubmitting;
  return (
    <div>
      <Heading
        title="Data Structures & Algorithms"
        description="Master the Art of Problem-Solving!"
        icon={BrainCircuit}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      ></Heading>
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        placeholder={
                          messages.length === 0
                            ? "What’s puzzling you today? Let’s dive into it!"
                            : "..."
                        }
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                        disabled={isLoading}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader></Loader>
            </div>
          )}
          {messages.length === 0 && !isLoading && <Empty />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.parts[0]["text"]}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <DivyaAvatar />}
                <Markdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className={cn(
                    "text-sm overflow-hidden leading-7",
                    poppins.className
                  )}
                >
                  {message.parts[0]["text"] || ""}
                </Markdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
