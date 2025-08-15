import { createClient } from "@/lib/server";

export async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return data.user;
}

export async function getCustomer({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("customers_view")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getActiveSubscription({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("active_subscriptions_view")
    .select("*")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products_view")
    .select("*")
    .order("unit_amount");

  if (error) {
    throw error;
  }

  return data;
}
