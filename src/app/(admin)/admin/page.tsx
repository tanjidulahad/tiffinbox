"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChefApplication {
  _id: string;
  userId: { name: string; email: string };
  kitchenName: string;
  area: string;
  cuisineType: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<ChefApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function fetchApplications() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/chef-applications");
      const data = await res.json();
      setApplications(data.applications || []);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  async function handleAction(id: string, action: "approve" | "reject") {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/chef-applications/${id}/${action}`, {
        method: "POST",
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      toast.success(
        action === "approve" ? "Chef approved" : "Application rejected"
      );
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status: action === "approve" ? "approved" : "rejected" }
            : app
        )
      );
    } catch {
      toast.error("Server error, please try again");
    } finally {
      setActionLoading(null);
    }
  }

  const pending = applications.filter((a) => a.status === "pending");
  const reviewed = applications.filter((a) => a.status !== "pending");

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Chef Applications</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review and approve seller applications
      </p>

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading...</p>
      ) : (
        <>
          <section className="mt-8">
            <h2 className="text-lg font-medium">
              Pending ({pending.length})
            </h2>
            <div className="mt-4 space-y-4">
              {pending.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No pending applications
                </p>
              )}
              {pending.map((app) => (
                <Card key={app._id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {app.kitchenName}
                      </CardTitle>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <CardDescription>
                      {app.userId.name} ({app.userId.email}) — {app.area}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{app.cuisineType}</p>
                    <div className="mt-4 flex gap-3">
                      <Button
                        size="sm"
                        disabled={actionLoading === app._id}
                        onClick={() => handleAction(app._id, "approve")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={actionLoading === app._id}
                        onClick={() => handleAction(app._id, "reject")}
                      >
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-lg font-medium">Reviewed</h2>
            <div className="mt-4 space-y-3">
              {reviewed.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between rounded-md border px-4 py-3 text-sm"
                >
                  <span>
                    {app.kitchenName} — {app.userId.name}
                  </span>
                  <Badge
                    variant={
                      app.status === "approved" ? "default" : "destructive"
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}