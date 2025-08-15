import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckoutButton } from "@/components/checkout-button";
import { cn } from "@/lib/utils";

export interface Plan {
  id?: string | null;
  name?: string | null;
  price?: number | null;
  currency?: string | null;
  interval?: string | null;
  description?: string | null;
  features?: string[] | null;
  priceId?: string | null;
  cta?: string | null;
  popular?: boolean | null;
}

export function PricingTable({ plans }: { plans?: Plan[] }) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
      {plans?.map((plan, index) => (
        <PricingCard key={index} plan={plan} />
      ))}
    </div>
  );
}

export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <Card className={cn("relative", plan.popular && "border-primary")}>
      {plan.popular && <CardPopular />}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardPricing
          price={plan.price}
          currency={plan.currency}
          interval={plan.interval}
        />
        <CardDescription className="mt-1">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <CardFeatures features={plan.features} />
      </CardContent>
      <CardFooter>
        <CheckoutButton
          priceId={plan.priceId}
          cta={plan.cta}
          popular={plan.popular}
        />
      </CardFooter>
    </Card>
  );
}

export function CardPopular() {
  return (
    <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Most Popular
    </Badge>
  );
}

export function CardPricing({
  price,
  currency,
  interval,
}: {
  price?: number | null;
  currency?: string | null;
  interval?: string | null;
}) {
  return (
    <div className="mt-4 flex items-baseline gap-1">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-muted-foreground text-sm">
        {currency}/{interval}
      </span>
    </div>
  );
}

export function CardFeatures({ features }: { features?: string[] | null }) {
  return (
    <ul className="space-y-2">
      {features?.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <Check className="size-4 shrink-0" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
