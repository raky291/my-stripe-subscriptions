"use server";

import { createClient } from "@/lib/server";
import { customerPortal } from "@/lib/stripe/utils";

export async function createCustomerPortal(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data) {
    throw new Error("User not authenticated");
  }

  await customerPortal({
    customerId: process.env.STRIPE_CUSTOMER_ID!,
    returnUrl: `${process.env.BASE_URL}/protected/manage-subscription`,
  });
}
