import { Check, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createCheckout } from "./actions";

export default async function SubscriptionPlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="flex flex-col justify-center items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Choose Your Subscription Plan
          </h1>
          <p className="text-lg text-gray-600">
            Select the plan that best fits your needs
          </p>
        </div>

        {/* Plan Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md relative overflow-hidden border-2 border-indigo-200 shadow-2xl">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                Most Popular
              </div>
            </div>

            <CardHeader className="text-center pt-8">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Premium Plan
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 mt-2">
                Perfect for advanced users
              </CardDescription>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-indigo-600">
                    $29
                  </span>
                  <span className="text-xl text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
              </div>
            </CardHeader>

            <CardContent className="px-6">
              {/* Features List */}
              <ul className="space-y-4">
                {[
                  "Unlimited access to all features",
                  "Priority 24/7 support",
                  "Advanced analytics and reports",
                  "Premium integrations",
                  "100GB storage",
                  "Full API access",
                  "Automatic backups",
                  "Advanced customization",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex-col px-6 pb-6">
              <form action={createCheckout}>
                <input
                  type="hidden"
                  name="priceId"
                  value={process.env.STRIPE_PRICE_ID}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  Subscribe Now
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                Cancel anytime. No long-term commitments.
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Why choose our Premium Plan?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Guaranteed Quality
                </h4>
                <p className="text-sm text-gray-600">
                  High-quality service with satisfaction guarantee
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-green-600 fill-current" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Exceptional Support
                </h4>
                <p className="text-sm text-gray-600">
                  Dedicated support team available 24/7
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Continuous Updates
                </h4>
                <p className="text-sm text-gray-600">
                  New features and improvements every month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
