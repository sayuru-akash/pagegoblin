"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RoastList } from "./roast-list";
import { Button } from "@/components/ui/button";
import type { DashboardRoast } from "@/lib/dashboard/service";

interface DashboardClientProps {
  initialRoasts: DashboardRoast[];
  page: number;
  totalPages: number;
}

export function DashboardClient({
  initialRoasts,
  page,
  totalPages,
}: DashboardClientProps) {
  const router = useRouter();
  const [roasts, setRoasts] = useState(initialRoasts);

  const handleUpdateVisibility = useCallback(
    async (slug: string, visibility: string) => {
      const res = await fetch(`/api/dashboard/roasts/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility }),
      });
      if (!res.ok) throw new Error("Failed to update visibility");
      setRoasts((prev) =>
        prev.map((r) => (r.slug === slug ? { ...r, visibility } : r))
      );
    },
    []
  );

  const handleDelete = useCallback(
    async (slug: string) => {
      const res = await fetch(`/api/dashboard/roasts/${slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setRoasts((prev) => prev.filter((r) => r.slug !== slug));
    },
    []
  );

  return (
    <div className="space-y-6">
      <RoastList
        roasts={roasts}
        onUpdateVisibility={handleUpdateVisibility}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => router.push(`/dashboard?page=${page - 1}`)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => router.push(`/dashboard?page=${page + 1}`)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
