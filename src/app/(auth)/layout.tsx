"use client";

import { Logo } from "@/components/logo";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, initialized } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (initialized && user) {
      router.replace("/dashboard");
    }
  }, [initialized, user, router]);

  if (!initialized || user) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-secondary/50">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="flex justify-center">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}
