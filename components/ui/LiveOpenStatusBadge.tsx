"use client";

import { siteConfig } from "@/data/site-config";
import { Clock } from "lucide-react";

export function LiveOpenStatusBadge() {
  // Current time in Bangladesh (UTC+6)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const bdTime = new Date(utc + 6 * 3600000);

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = dayNames[bdTime.getDay()];
  const todaySchedule = siteConfig.hours.find((h) => h.day === todayName);

  let isOpen = true;
  let message = "Open today";

  if (todaySchedule) {
    const currentMinutes = bdTime.getHours() * 60 + bdTime.getMinutes();
    const [openH, openM] = todaySchedule.open.split(":").map(Number);
    const [closeH, closeM] = todaySchedule.close.split(":").map(Number);

    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    if (isOpen) {
      message = `Open Now · Closes at ${todaySchedule.close}`;
    } else if (currentMinutes < openMinutes) {
      message = `Closed Now · Opens today at ${todaySchedule.open}`;
    } else {
      message = "Closed Now · Reopens tomorrow";
    }
  }

  const status = { isOpen, message };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${
        status.isOpen
          ? "border-herb/40 bg-herb/15 text-herb"
          : "border-primary/40 bg-primary/15 text-primary"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          status.isOpen ? "bg-herb animate-ping" : "bg-primary"
        }`}
      />
      <Clock className="h-3.5 w-3.5" />
      <span>{status.message}</span>
    </div>
  );
}
