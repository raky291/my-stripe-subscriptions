import Link from "next/link";
import { ArrowRight, CheckCircle, Download, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Success Icon and Title */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your subscription has been activated successfully
            </p>
          </div>

          {/* Payment Details Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Plan
                  </p>
                  <p className="text-lg font-semibold">Premium Monthly</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Price
                  </p>
                  <p className="text-lg font-semibold">$29.99 USD</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Payment Method
                  </p>
                  <p className="text-lg font-semibold">•••• •••• •••• 4242</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Next Billing Date
                  </p>
                  <p className="text-lg font-semibold">August 30, 2025</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Transaction ID
                  </p>
                  <p className="rounded bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
                    txn_1NXWnLGswQQ9xXyz123456
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What&apos;s Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Mail className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Email Confirmation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We&apos;ve sent a receipt to your email
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Download className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Immediate Access</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You now have access to all premium features of your
                      account
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <ArrowRight className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">24/7 Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Our team is available to help you at any time
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/protected" className="flex-1 sm:flex-none">
              <Button size="lg" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>

            <Link
              href="/protected/subscription-plans"
              className="flex-1 sm:flex-none"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Plans
              </Button>
            </Link>

            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t pt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Have questions? Contact us at{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
