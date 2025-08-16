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
import { Button } from "@/components/ui/button";
import { checkoutAction } from "@/lib/stripe/actions";
import { cn } from "@/lib/utils";

export type Feature = {
  name: string;
};

export type Plan = {
  id: string | null;
  name: string | null;
  unit_amount: number | null;
  currency: string | null;
  interval: string | null;
  description: string | null;
  features: Feature[] | null;
  price_id: string | null;
  cta: string | null;
  popular: boolean | null;
};

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
      {plan.popular && (
        <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Most Popular
        </Badge>
      )}

      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold">${plan.unit_amount}</span>
          <span className="text-muted-foreground text-sm">
            {plan.currency}/{plan.interval}
          </span>
        </div>

        <CardDescription className="mt-1">{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-2">
          {plan.features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="size-4 shrink-0" />
              <span className="text-sm">{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <form action={checkoutAction} className="w-full">
          <input type="hidden" name="priceId" value={plan.price_id ?? ""} />
          <Button
            type="submit"
            variant={plan.popular ? "default" : "outline"}
            className="w-full"
          >
            {plan.cta}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
