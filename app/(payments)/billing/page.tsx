import { redirect } from "next/navigation";
import { SubscriptionCard } from "@/components/subscription-card";
import { getSubscription, getUser } from "@/lib/stripe/queries";

export default async function BillingPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }

  const subscription = await getSubscription({ userId: user.id });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <SubscriptionCard subscription={subscription} />
      </div>
    </div>
  );
}
