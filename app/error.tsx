"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center pt-24 pb-16 bg-bg text-center text-cream">
      <Container>
        <div className="mx-auto max-w-lg">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-danger/40 bg-danger/10 text-danger shadow-glow">
            <AlertTriangle className="h-10 w-10 text-danger" />
          </div>

          <span className="font-label text-xs text-danger tracking-widest">
            KITCHEN SPILL DETECTED
          </span>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-cream mt-2 mb-4">
            Something Sizzled Unexpectedly
          </h1>

          <p className="text-sm text-muted leading-relaxed mb-8">
            Our kitchen ran into a momentary interruption. Please attempt to refresh the dish or step back to the reception.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => reset()}
              className="gap-2 shadow-glow"
            >
              <RotateCcw className="h-4 w-4" /> Try Again
            </Button>
            <Link href="/">
              <Button variant="secondary" size="lg">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
