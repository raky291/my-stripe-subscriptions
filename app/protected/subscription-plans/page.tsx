import Link from "next/link";
import { ArrowLeft, Check, Star } from "lucide-react";

import { checkoutAction } from "@/lib/stripe/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SubscriptionPlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-6xl py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/protected">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Choose Your Subscription Plan
            </h1>
            <p className="text-lg text-gray-600">
              Select the plan that best fits your needs
            </p>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Plan Card */}
        <div className="flex justify-center">
          <Card className="relative w-full max-w-md overflow-hidden border-2 border-indigo-200 shadow-2xl">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 rounded-bl-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1 text-sm font-semibold text-white">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                Most Popular
              </div>
            </div>

            <CardHeader className="pt-8 text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Premium Plan
              </CardTitle>
              <CardDescription className="mt-2 text-lg text-gray-600">
                Perfect for advanced users
              </CardDescription>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-indigo-600">
                    $29
                  </span>
                  <span className="ml-1 text-xl text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Billed monthly</p>
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
                    <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex-col px-6 pb-6">
              <form action={checkoutAction}>
                <input
                  type="hidden"
                  name="priceId"
                  value={process.env.STRIPE_PRICE_ID}
                />

                <Button
                  type="submit"
                  className="h-12 w-full transform bg-gradient-to-r from-indigo-500 to-purple-600 text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700"
                >
                  Subscribe Now
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-gray-500">
                Cancel anytime. No long-term commitments.
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Why choose our Premium Plan?
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900">
                  Guaranteed Quality
                </h4>
                <p className="text-sm text-gray-600">
                  High-quality service with satisfaction guarantee
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Star className="h-6 w-6 fill-current text-green-600" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900">
                  Exceptional Support
                </h4>
                <p className="text-sm text-gray-600">
                  Dedicated support team available 24/7
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <div className="h-6 w-6 rounded-full bg-purple-600"></div>
                </div>
                <h4 className="mb-2 font-semibold text-gray-900">
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
