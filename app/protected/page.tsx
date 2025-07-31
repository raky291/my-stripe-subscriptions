import { redirect } from "next/navigation";
import Link from "next/link";
import {
  User,
  CreditCard,
  Package,
  Settings,
  Mail,
  Calendar,
} from "lucide-react";

import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600">
            Hello <span className="font-semibold">{data.user.email}</span>
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-semibold">{data.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Subscription Plans Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-indigo-200 bg-white/70 backdrop-blur-sm">
            <Link href="/protected/subscription-plans">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="w-6 h-6 text-white" />
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
                <p className="text-gray-600 text-sm mb-4">
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
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-200 bg-white/70 backdrop-blur-sm">
            <Link href="/protected/manage-subscription">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6 text-white" />
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
                <p className="text-gray-600 text-sm mb-4">
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
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-gray-200 bg-white/70 backdrop-blur-sm md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Account Settings</h3>
                  <p className="text-sm text-gray-500">Manage your account</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Update your profile, security settings, and preferences.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <LogoutButton className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Account Status
                </h4>
                <p className="text-sm text-green-600 font-medium">Active</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Current Plan
                </h4>
                <p className="text-sm text-gray-600">Free Tier</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
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
