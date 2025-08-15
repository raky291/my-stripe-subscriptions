import { PricingTable } from "@/components/pricing-table";
import { getProducts } from "@/lib/stripe/queries";

type Features = { name: string }[] | null;

export default async function PricingPage() {
  const products = await getProducts();

  const plans = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.unit_amount,
    currency: product.currency,
    interval: product.interval,
    description: product.description,
    features: (product.features as Features)?.map((feature) => feature.name),
    priceId: product.price_id,
    cta: "Get Started",
    popular: Boolean(product.popular),
  }));

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full">
        <PricingTable plans={plans} />
      </div>
    </div>
  );
}
