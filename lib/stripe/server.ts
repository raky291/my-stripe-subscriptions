import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function createCustomer({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) {
  const customer = await stripe.customers.create({
    email: email,
    metadata: {
      userId: userId,
    },
  });

  return customer;
}

export async function createCheckoutSession({
  userId,
  customerId,
  priceId,
}: {
  userId: string;
  customerId: string;
  priceId: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/pricing`,
    client_reference_id: userId,
    customer: customerId,
    saved_payment_method_options: {
      payment_method_save: "enabled",
    },
  });

  return session;
}

export async function createBillingPortalSession({
  customerId,
}: {
  customerId: string;
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.BASE_URL}/pricing`,
  });

  return session;
}
