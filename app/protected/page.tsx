import { redirect } from "next/navigation";
import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-svh w-full items-center justify-center">
      <div className="text-center space-y-6">
        <p className="text-lg">
          Hello <span className="font-semibold">{data.user.email}</span>
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/protected/subscription-plans">
            <Button className="w-full">View Subscription Plans</Button>
          </Link>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
