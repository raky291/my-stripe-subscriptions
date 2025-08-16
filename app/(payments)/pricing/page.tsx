import { type Plan, PricingTable } from "@/components/pricing-table";
import { getProducts } from "@/lib/stripe/queries";

export default async function PricingPage() {
  const products = await getProducts();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full">
        <PricingTable plans={products as Plan[]} />
      </div>
    </div>
  );
}
