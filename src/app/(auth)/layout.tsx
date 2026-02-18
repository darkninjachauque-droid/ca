import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
