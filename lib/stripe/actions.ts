"use server";

import { redirect } from "next/navigation";

import { getCustomer, getUser } from "./queries";
import { createCheckoutSession, createCustomerPortalSession } from "./server";

type ActionWithCustomer<T> = (
  formData: FormData,
  userId: string,
  customerId: string,
) => Promise<T>;

function withCustomer<T>(action: ActionWithCustomer<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect("/auth/login");
    }

    const customer = await getCustomer({ userId: user.id });
    if (!customer || !customer.id) {
      throw new Error("Customer not found");
    }

    return action(formData, user.id, customer.id);
  };
}

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
      returnUrl: `${process.env.BASE_URL}/billing`,
    });
  },
);
