import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Calendar,
  DollarSign,
  Download,
  AlertCircle,
  CheckCircle,
  Settings,
  ArrowLeft,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/server";
import { customerPortalAction } from "@/lib/stripe/actions";

export default async function ManageSubscriptionPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  // Mock data
  const subscriptionData = {
    status: "active", // "active", "past_due", "canceled", "trialing"
    plan: "Premium Monthly",
    price: "$29.99",
    nextBilling: "August 30, 2025",
    paymentMethod: "•••• •••• •••• 4242",
    created: "July 30, 2024",
  };

  const billingHistory = [
    {
      date: "July 30, 2025",
      amount: "$29.99",
      status: "paid",
      invoice: "inv_1abc123",
    },
    {
      date: "June 30, 2025",
      amount: "$29.99",
      status: "paid",
      invoice: "inv_1def456",
    },
    {
      date: "May 30, 2025",
      amount: "$29.99",
      status: "paid",
      invoice: "inv_1ghi789",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "past_due":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "canceled":
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "past_due":
        return "text-yellow-600 bg-yellow-100";
      case "canceled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/protected">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Manage Subscription
              </h1>
              <p className="text-lg text-gray-600">
                Control your subscription and billing settings
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Subscription Card */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  Current Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(subscriptionData.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          subscriptionData.status
                        )}`}
                      >
                        {subscriptionData.status.charAt(0).toUpperCase() +
                          subscriptionData.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Member since {subscriptionData.created}
                    </p>
                  </div>

                  {/* Plan Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Current Plan
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {subscriptionData.plan}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Price
                        </p>
                        <p className="text-xl font-semibold text-indigo-600">
                          {subscriptionData.price}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Next Billing Date
                        </p>
                        <p className="text-lg font-semibold flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {subscriptionData.nextBilling}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Payment Method
                        </p>
                        <p className="text-lg font-semibold flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          {subscriptionData.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <form action={customerPortalAction}>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Billing
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Billing History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map((bill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {bill.amount}
                          </p>
                          <p className="text-sm text-gray-500">{bill.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            bill.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {bill.status === "paid" ? "Paid" : "Failed"}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Latest Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Billing Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Methods
                </Button>
              </CardContent>
            </Card>

            {/* Subscription Info */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Subscription Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Unlimited access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Advanced features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">100GB storage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-100 text-sm mb-4">
                  Our support team is here to help you with any questions about
                  your subscription.
                </p>
                <Button variant="secondary" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
