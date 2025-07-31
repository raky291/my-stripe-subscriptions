"use server";

import { redirect } from "next/navigation";
import { createBillingPortalSession, createCheckoutSession } from "./server";

export async function checkout({
  userId,
  customerId,
  priceId,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await createCheckoutSession({
    userId,
    customerId,
    priceId,
    successUrl,
    cancelUrl,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  redirect(session.url);
}

export async function customerPortal({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  const session = await createBillingPortalSession({
    customerId,
    returnUrl,
  });

  if (!session.url) {
    throw new Error("Failed to create billing portal session");
  }

  redirect(session.url);
}
