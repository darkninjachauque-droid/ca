"use client"

import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  useEffect(() => {
    redirect('/dashboard');
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
    </div>
  );
}
