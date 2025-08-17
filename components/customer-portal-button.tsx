import { Button } from "@/components/ui/button";
import { customerPortalAction } from "@/lib/stripe/actions";

export function CustomerPortalButton() {
  return (
    <form action={customerPortalAction}>
      <Button type="submit" variant="outline">
        Manage Subscription
      </Button>
    </form>
  );
}
