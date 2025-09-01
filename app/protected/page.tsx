import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Calendar,
  CreditCard,
  Mail,
  Package,
  Settings,
  User,
} from "lucide-react";

import { createClient } from "@/lib/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoutButton } from "@/components/logout-button";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600">
            Hello <span className="font-semibold">{data.user.email}</span>
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 border-0 bg-white/70 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-600" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-semibold">{data.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Member Since
                  </p>
                  <p className="font-semibold">
                    {new Date(data.user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Subscription Plans Card */}
          <Card className="group cursor-pointer border-2 border-transparent bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-xl">
            <Link href="/protected/subscription-plans">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 transition-transform group-hover:scale-110">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">View Plans</h3>
                    <p className="text-sm text-gray-500">
                      Explore subscription options
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Discover our premium plans and upgrade your experience with
                  advanced features.
                </p>
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  View All Plans
                </Button>
              </CardContent>
            </Link>
          </Card>

          {/* Manage Subscription Card */}
          <Card className="group cursor-pointer border-2 border-transparent bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-green-200 hover:shadow-xl">
            <Link href="/protected/manage-subscription">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-teal-600 transition-transform group-hover:scale-110">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Manage Subscription
                    </h3>
                    <p className="text-sm text-gray-500">
                      Control your subscription
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Update payment methods, view billing history, and manage your
                  subscription.
                </p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
                  Manage Subscription
                </Button>
              </CardContent>
            </Link>
          </Card>

          {/* Settings Card */}
          <Card className="group cursor-pointer border-2 border-transparent bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-gray-200 hover:shadow-xl md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 transition-transform group-hover:scale-110">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Account Settings</h3>
                  <p className="text-sm text-gray-500">Manage your account</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Update your profile, security settings, and preferences.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <LogoutButton className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 bg-white/70 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="mb-1 font-semibold text-gray-900">
                  Account Status
                </h4>
                <p className="text-sm font-medium text-green-600">Active</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <Package className="h-6 w-6 text-indigo-600" />
                </div>
                <h4 className="mb-1 font-semibold text-gray-900">
                  Current Plan
                </h4>
                <p className="text-sm text-gray-600">Free Tier</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="mb-1 font-semibold text-gray-900">
                  Member Since
                </h4>
                <p className="text-sm text-gray-600">
                  {new Date(data.user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
