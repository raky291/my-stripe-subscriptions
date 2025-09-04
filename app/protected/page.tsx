import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold">
          Welcome to your Dashboard
        </h1>
        <p className="text-lg">
          Hello <span className="font-medium">{data.claims.email}</span>
        </p>
      </div>

      <div className="flex w-full max-w-md flex-col gap-4">
        <Button className="w-full" variant="outline" asChild>
          <Link href="/billing">View my Billing</Link>
        </Button>

        <Button className="w-full" variant="outline" asChild>
          <Link href="/pricing">View Plans & Pricing</Link>
        </Button>
      </div>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
