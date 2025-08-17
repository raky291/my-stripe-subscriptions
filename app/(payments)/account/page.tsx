import { redirect } from "next/navigation";
import { CustomerPortalButton } from "@/components/customer-portal-button";
import { getSubscription, getUser } from "@/lib/stripe/queries";

export default async function AccountPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login");
  }

  const subscription = await getSubscription({ userId: user.id });
  console.log("subscription", subscription);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full">
        <CustomerPortalButton />
      </div>
    </div>
  );
}
