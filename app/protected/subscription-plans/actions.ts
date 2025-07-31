"use server";

import { createClient } from "@/lib/server";
import { checkout } from "@/lib/stripe/utils";

export async function createCheckout(formData: FormData) {
  const priceId = formData.get("priceId") as string | null;
  if (!priceId) {
    throw new Error("Price ID is required");
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    throw new Error("User not authenticated");
  }

  await checkout({
    userId: data.user.id,
    customerId: process.env.STRIPE_CUSTOMER_ID!,
    priceId: priceId,
    successUrl: `${process.env.BASE_URL}/protected/payment-success`,
    cancelUrl: `${process.env.BASE_URL}/protected/subscription-plans`,
  });
}
