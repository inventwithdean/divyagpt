"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  if (isSignedIn) {
    router.push("/dashboard");
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to दिव्यGPT</CardTitle>
            <CardDescription>
              Elevate Your Learning Experience in an Engaging way.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col m-2 items-center justify-center space-y-4">
              <Link href="/sign-in" className="w-full flex justify-center">
                <Button className="flex-1 col-span-12 lg:col-span-2">
                  <Mail className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
              <Link href="/sign-up" className="w-full flex justify-center">
                <Button className="flex-1 col-span-12 lg:col-span-2">
                  <Mail className="mr-2 h-4 w-4" /> Register
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-sm flex-1 text-end">
              Currently in Development!
            </p>
          </CardFooter>
        </Card>
      </div>
      <footer className="bg-gray-200 w-full py-4 mt-4">
        <div className="px-4 flex justify-center space-x-4 text-sm">
          <Link href="/terms">Terms and Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}
