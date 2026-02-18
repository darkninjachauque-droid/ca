"use client"

import { useUser } from "@/firebase";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";


export default function Home() {
  const { user, initialized } = useUser();

  useEffect(() => {
    if (initialized) {
      if (user) {
        redirect('/dashboard');
      } else {
        redirect('/login');
      }
    }
  }, [initialized, user]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
       <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
