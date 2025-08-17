"use server";

import { redirect } from "next/navigation";
import { createCheckoutSession, createCustomerPortalSession } from "./server";
import { withCustomer } from "./utils";

export const checkoutAction = withCustomer(
  async (formData, userId, customerId) => {
    const priceId = formData.get("priceId") as string | null;
    if (!priceId) {
      redirect("/protected");
    }

    await createCheckoutSession({
      userId: userId,
      customerId: customerId,
      priceId: priceId,
      successUrl: `${process.env.BASE_URL}/protected`,
      cancelUrl: `${process.env.BASE_URL}/pricing`,
    });
  },
);

export const customerPortalAction = withCustomer(
  async (_formData, _userId, customerId) => {
    await createCustomerPortalSession({
      customerId: customerId,
      returnUrl: `${process.env.BASE_URL}/account`,
    });
  },
);
