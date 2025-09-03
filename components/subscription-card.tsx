import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { customerPortalAction } from "@/lib/stripe/actions";

export type Subscription = {
  id: string | null;
  status: string | null;
  customer_id: string | null;
  user_id: string | null;
  current_period_end: number | null;
  price_id: string | null;
  price_unit_amount: number | null;
  price_currency: string | null;
  price_interval: string | null;
  product_id: string | null;
  product_name: string | null;
  product_description: string | null;
};

export function SubscriptionCard({
  subscription,
}: {
  subscription?: Subscription | null;
}) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Current Plan</CardTitle>
        <CardDescription>Your active subscription details</CardDescription>
      </CardHeader>

      {subscription ? (
        <ActiveSubscription subscription={subscription} />
      ) : (
        <FreeSubscription />
      )}
    </Card>
  );
}

export function FreeSubscription() {
  return null;
}

export function ActiveSubscription({
  subscription: {
    product_name,
    product_description,
    price_currency,
    price_unit_amount,
    price_interval,
    current_period_end,
  },
}: {
  subscription: Subscription;
}) {
  return (
    <>
      <CardContent className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-semibold">{product_name}</h3>
          <p className="text-muted-foreground text-sm">{product_description}</p>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">Billing plan</p>
            <p className="text-muted-foreground text-sm">
              <span>
                {price_currency}${price_unit_amount?.toFixed(2)}
              </span>
              <span className="ml-1">/ {price_interval}</span>
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Next billing date</p>
            <p className="text-muted-foreground text-sm">
              {current_period_end
                ? format(current_period_end * 1000, "MMM dd, yyyy")
                : null}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t">
        <form action={customerPortalAction}>
          <Button type="submit" variant="outline">
            Manage Subscription
          </Button>
        </form>
      </CardFooter>
    </>
  );
}
