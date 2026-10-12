"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { reservationSchema, ReservationFormData } from "@/lib/validations";
import { Button, Input, Textarea } from "@/components/ui";
import { Calendar, Users, UserCheck, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

interface SlotInfo {
  time: string;
  available: boolean;
  remainingTables: number;
}

const STEPS = [
  { id: 1, label: "Date & Time", icon: Calendar },
  { id: 2, label: "Guests & Table", icon: Users },
  { id: 3, label: "Your Details", icon: UserCheck },
  { id: 4, label: "Confirmation", icon: CheckCircle2 },
];

export function ReservationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    data: ReservationFormData;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      time: "19:00",
      guests: 2,
      name: "",
      phone: "",
      email: "",
      notes: "",
      website: "",
    },
    mode: "onBlur",
  });

  const selectedDate = watch("date");
  const selectedTime = watch("time");
  const selectedGuests = watch("guests");

  // Fetch slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;
    let isCancelled = false;

    async function fetchAvailability() {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/reservations/availability?date=${selectedDate}`);
        const data = await res.json();
        if (!isCancelled && data.slots) {
          setSlots(data.slots);
          // If current selected time is not available in new date, pick first available
          const currentAvailable = data.slots.find(
            (s: SlotInfo) => s.time === selectedTime && s.available
          );
          if (!currentAvailable) {
            const firstAvailable = data.slots.find((s: SlotInfo) => s.available);
            if (firstAvailable) setValue("time", firstAvailable.time);
          }
        }
      } catch (err) {
        console.error("Availability fetch error:", err);
      } finally {
        if (!isCancelled) setLoadingSlots(false);
      }
    }

    fetchAvailability();
    return () => {
      isCancelled = true;
    };
  }, [selectedDate, selectedTime, setValue]);

  // Step 1 -> 2
  const handleNextFromStep1 = async () => {
    const valid = await trigger(["date", "time"]);
    if (valid) setCurrentStep(2);
  };

  // Step 2 -> 3
  const handleNextFromStep2 = async () => {
    const valid = await trigger(["guests"]);
    if (valid) setCurrentStep(3);
  };

  // Submission
  const onSubmit = async (values: ReservationFormData) => {
    setSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmittedData({ id: result.reservationId, data: values });
        setCurrentStep(4);
      } else {
        setApiError(result.error || "Failed to confirm table reservation.");
      }
    } catch {
      setApiError("Network error. Please try calling us at +880 1700-000000.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-bg-elevated p-6 sm:p-10 shadow-2xl">
      {/* Multi-step progress track */}
      <div className="mb-10 flex items-center justify-between border-b border-border/80 pb-6">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border transition-all ${
                  isActive
                    ? "border-primary bg-primary text-cream shadow-glow scale-105"
                    : isDone
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-border bg-bg-soft text-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`hidden sm:inline-block font-label text-[11px] tracking-wider ${
                  isActive ? "text-cream font-bold" : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {apiError && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Anti-spam Honeypot */}
        <input
          type="text"
          {...register("website")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <AnimatePresence mode="wait">
          {/* STEP 1: DATE & TIME */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="font-display text-2xl font-bold text-cream mb-1">
                  Select Your Date & Preferred Time
                </h3>
                <p className="text-xs text-muted">
                  Tables may be reserved up to 30 days in advance.
                </p>
              </div>

              <div>
                <Input
                  label="Dining Date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("date")}
                  error={errors.date?.message}
                />
              </div>

              <div>
                <label className="font-label text-xs text-accent mb-3 block">
                  AVAILABLE TIME SLOTS ({selectedDate})
                </label>

                {loadingSlots ? (
                  <div className="py-8 text-center text-sm text-muted">
                    Checking kitchen & table availability...
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {slots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setValue("time", slot.time)}
                          className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs transition-all ${
                            isSelected
                              ? "border-primary bg-primary text-cream shadow-glow font-bold"
                              : slot.available
                              ? "border-border bg-bg-soft text-cream/90 hover:border-cream/30"
                              : "border-border/30 bg-bg opacity-30 cursor-not-allowed text-muted"
                          }`}
                        >
                          <span className="font-display text-sm">{slot.time}</span>
                          <span className="text-[9px] mt-0.5">
                            {slot.available ? `${slot.remainingTables} left` : "Full"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.time && (
                  <p className="mt-2 text-xs text-danger">{errors.time.message}</p>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <Button type="button" variant="primary" size="lg" onClick={handleNextFromStep1}>
                  Continue to Guests →
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: GUESTS & SPECIAL REQUESTS */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="font-display text-2xl font-bold text-cream mb-1">
                  Party Size & Seating
                </h3>
                <p className="text-xs text-muted">
                  Dining slot: <strong className="text-accent">{selectedDate} at {selectedTime}</strong>
                </p>
              </div>

              <div>
                <label className="font-label text-xs text-accent mb-3 block">
                  NUMBER OF GUESTS
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setValue("guests", num)}
                      className={`h-12 rounded-xl border font-display text-base transition-all ${
                        selectedGuests === num
                          ? "border-primary bg-primary text-cream shadow-glow font-bold"
                          : "border-border bg-bg-soft text-cream hover:border-cream/40"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {errors.guests && (
                  <p className="mt-2 text-xs text-danger">{errors.guests.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  label="Special Dining Requests (e.g., Birthday, Anniversary, High Chair)"
                  {...register("notes")}
                  error={errors.notes?.message}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button type="button" variant="secondary" onClick={() => setCurrentStep(1)}>
                  ← Back
                </Button>
                <Button type="button" variant="primary" size="lg" onClick={handleNextFromStep2}>
                  Continue to Contact →
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONTACT DETAILS & SUBMIT */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="font-display text-2xl font-bold text-cream mb-1">
                  Contact Information
                </h3>
                <p className="text-xs text-muted">
                  We will send a reservation confirmation instantly via SMS and Email.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  {...register("name")}
                  error={errors.name?.message}
                />
                <Input
                  label="Phone / WhatsApp Number *"
                  placeholder="+880 1700..."
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </div>

              <Input
                label="Email Address (for instant confirmation receipt)"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />

              {/* Order Summary Recap Box */}
              <div className="rounded-xl border border-border bg-bg-soft p-4 text-xs text-cream/90 flex flex-col gap-2">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted">Reserved Date & Slot:</span>
                  <span className="font-bold text-accent">{selectedDate} @ {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Party Size:</span>
                  <span className="font-bold text-cream">{selectedGuests} Guests</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button type="button" variant="secondary" onClick={() => setCurrentStep(2)}>
                  ← Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                  className="shadow-glow"
                >
                  {submitting ? "Securing Table..." : "Confirm Reservation 🎉"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION SCREEN */}
          {currentStep === 4 && submittedData && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-6"
            >
              {/* Confetti-style micro celebration */}
              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent bg-accent/20 text-accent shadow-gold animate-bounce">
                  <CheckCircle2 className="h-10 w-10 text-accent" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 text-primary"
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
              </div>

              <h3 className="font-display text-3xl font-bold text-cream mb-2">
                Your Table is Reserved!
              </h3>
              <p className="max-w-md text-sm text-muted mb-6">
                Thank you, <strong>{submittedData.data.name}</strong>. Your dining experience at Bhojon Bilash has been confirmed.
              </p>

              <div className="w-full max-w-md rounded-2xl border border-accent/30 bg-bg-soft p-5 text-left text-xs mb-8">
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted">Booking Reference:</span>
                  <span className="font-mono text-accent font-bold">{submittedData.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted">Date & Time:</span>
                  <span className="text-cream font-semibold">{submittedData.data.date} at {submittedData.data.time}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted">Guests:</span>
                  <span className="text-cream font-semibold">{submittedData.data.guests} Guests</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted">Restaurant Address:</span>
                  <span className="text-cream">House 12, Rd 5, Dhanmondi</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    setCurrentStep(1);
                    setSubmittedData(null);
                  }}
                >
                  Make Another Reservation
                </Button>
                <Link href="/">
                  <Button type="button" variant="secondary">
                    Back to Homepage
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
