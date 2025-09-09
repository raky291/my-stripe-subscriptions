import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkoutAction } from "@/lib/stripe/actions";
import { cn } from "@/lib/utils";

export type Feature = {
  name: string;
};

export type Plan = {
  id: string | null;
  name: string | null;
  description: string | null;
  features: Feature[] | null;
  cta: string | null;
  popular: boolean | null;
  price_id: string | null;
  currency: string | null;
  unit_amount: number | null;
  interval: string | null;
};

export function PricingTable({ plans }: { plans?: Plan[] | null }) {
  if (!plans || plans.length === 0) {
    return <PricingEmptyState />;
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {plans.map((plan, index) => (
        <PricingCard key={index} plan={plan}>
          {plan.price_id && (
            <CheckoutButton
              priceId={plan.price_id}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta ?? "Get Started"}
            </CheckoutButton>
          )}
        </PricingCard>
      ))}
    </div>
  );
}

export function PricingEmptyState() {
  return (
    <div className="flex flex-col items-center">
      <p>No subscription pricing plans found.</p>
    </div>
  );
}

export function PricingCard({
  plan,
  children,
}: {
  plan: Plan;
  children?: React.ReactNode;
}) {
  const {
    name,
    description,
    unit_amount,
    currency,
    interval,
    features,
    popular,
  } = plan;

  return (
    <Card className={cn("relative", popular && "border-primary")}>
      {popular && (
        <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Most Popular
        </Badge>
      )}

      <CardHeader>
        <CardTitle>{name}</CardTitle>

        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold">${unit_amount}</span>
          <span className="text-muted-foreground ml-1 text-sm">
            {currency}/{interval}
          </span>
        </div>

        <CardDescription className="mt-1">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="size-4 shrink-0" />
              <span className="text-sm">{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>{children}</CardFooter>
    </Card>
  );
}

export function CheckoutButton({
  className,
  priceId,
  ...props
}: React.ComponentProps<typeof Button> & {
  priceId: string;
}) {
  return (
    <form action={checkoutAction} className="w-full">
      <input type="hidden" name="priceId" value={priceId} />
      <Button type="submit" className={cn("w-full", className)} {...props} />
    </form>
  );
}
