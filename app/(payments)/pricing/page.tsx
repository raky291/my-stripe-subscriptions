import { PricingTable } from "@/components/pricing-table";
import { getProducts } from "@/lib/stripe/queries";

export default async function PricingPage() {
  const products = await getProducts();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-6xl">
        <PricingTable plans={products} />
      </div>
    </div>
  );
}
