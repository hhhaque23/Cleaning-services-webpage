export type BookingStatus =
  | "new"
  | "confirmed"
  | "scheduled"
  | "completed"
  | "cancelled";

export const STATUS_FLOW: BookingStatus[] = [
  "new",
  "confirmed",
  "scheduled",
  "completed",
];

export const STATUS_META: Record<
  BookingStatus,
  { label: string; tone: "ink" | "grass" | "amber" | "rose" }
> = {
  new: { label: "New", tone: "amber" },
  confirmed: { label: "Confirmed", tone: "ink" },
  scheduled: { label: "Scheduled", tone: "ink" },
  completed: { label: "Completed", tone: "grass" },
  cancelled: { label: "Cancelled", tone: "rose" },
};

export type Booking = {
  id: string;
  createdAt: string;
  status: BookingStatus;
  email: string;
  phone: string;
  address: string;
  apt: string | null;
  notes: string | null;
  tier: "Standard" | "Deep" | "MoveInOut";
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  frequency: "onetime" | "monthly" | "biweekly" | "weekly";
  addOns: string[];
  slotDate: string;
  slotWindow: "morning" | "midday" | "afternoon";
  priceSubtotal: number;
  priceDiscount: number;
  priceTotal: number;
  assignedTo: string | null;
};

export type NewBooking = Omit<Booking, "id" | "createdAt" | "status" | "assignedTo">;
