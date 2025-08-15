import { Button } from "@/components/ui/button";
import { checkoutAction } from "@/lib/stripe/actions";

export function CheckoutButton({
  priceId,
  cta,
  popular,
}: {
  priceId?: string | null;
  cta?: string | null;
  popular?: boolean | null;
}) {
  return (
    <form action={checkoutAction} className="w-full">
      <input type="hidden" name="priceId" value={priceId ?? ""} />
      <Button
        type="submit"
        variant={popular ? "default" : "outline"}
        className="w-full"
      >
        {cta}
      </Button>
    </form>
  );
}
