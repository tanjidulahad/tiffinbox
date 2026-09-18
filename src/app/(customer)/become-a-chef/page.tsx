"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  chefApplicationSchema,
  ChefApplicationInput,
} from "@/lib/validations/chef";

type ApplicationStatus = "pending" | "approved" | "rejected" | null;

export default function BecomeAChefPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [status, setStatus] = useState<ApplicationStatus>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChefApplicationInput>({
    resolver: zodResolver(chefApplicationSchema),
  });

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/chef-application");
        const result = await res.json();
        setStatus(result.application?.status ?? null);
      } catch {
        setStatus(null);
      } finally {
        setCheckingStatus(false);
      }
    }
    fetchStatus();
  }, []);

  async function onSubmit(data: ChefApplicationInput) {
    setLoading(true);
    try {
      const res = await fetch("/api/chef-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      toast.success("Application submitted! We'll review it shortly");
      setStatus("pending");
    } catch {
      toast.error("Server error, please try again");
    } finally {
      setLoading(false);
    }
  }

  if (checkingStatus) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <p className="text-sm text-muted-foreground">Checking your application status...</p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Application under review</CardTitle>
            <CardDescription>
              We&apos;ve received your seller application. You&apos;ll be able
              to access your chef dashboard once it&apos;s approved.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (status === "approved") {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">You&apos;re already a seller</CardTitle>
            <CardDescription>
              Your kitchen is live. Head to your chef dashboard to manage your menu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/chef-dashboard")}>
              Go to chef dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Application not approved</CardTitle>
            <CardDescription>
              Your previous application wasn&apos;t approved. Contact support
              if you&apos;d like to know more, or reach out to reapply.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // status === null → no application yet, show the form
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Become a Seller</CardTitle>
            <CardDescription>
              Tell us about your kitchen. We&apos;ll review your application
              and get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kitchenName">Kitchen name</Label>
                <Input
                  id="kitchenName"
                  placeholder="e.g. Rahima's Kitchen"
                  {...register("kitchenName")}
                />
                {errors.kitchenName && (
                  <p className="text-sm text-destructive">
                    {errors.kitchenName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  {...register("area")}
                />
                {errors.area && (
                  <p className="text-sm text-destructive">
                    {errors.area.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuisineType">Cuisine type</Label>
                <Textarea
                  id="cuisineType"
                  placeholder="e.g. Bengali home-style, biryani, everyday lunch"
                  {...register("cuisineType")}
                />
                {errors.cuisineType && (
                  <p className="text-sm text-destructive">
                    {errors.cuisineType.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}