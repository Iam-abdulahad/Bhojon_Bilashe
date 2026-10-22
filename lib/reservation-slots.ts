export const RESERVATION_TIME_SLOTS = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export const MAX_TABLES_PER_SLOT = 8;

export function getReservationDateError(date: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return "Please choose a valid reservation date.";
  }

  const dateValue = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(dateValue.getTime()) || dateValue.toISOString().slice(0, 10) !== date) {
    return "Please choose a valid reservation date.";
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const daysFromToday = (dateValue.getTime() - today.getTime()) / 86_400_000;

  if (daysFromToday < 0) {
    return "Reservations must be for today or a future date.";
  }
  if (daysFromToday > 30) {
    return "Reservations can be made up to 30 days in advance.";
  }

  return null;
}
