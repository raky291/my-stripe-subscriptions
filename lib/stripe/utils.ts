import { redirect } from "next/navigation";
import { getCustomer, getUser } from "./queries";

type ActionWithCustomer = (
  formData: FormData,
  userId: string,
  customerId: string,
) => Promise<void>;

export function withCustomer(action: ActionWithCustomer) {
  return async (formData: FormData): Promise<void> => {
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
