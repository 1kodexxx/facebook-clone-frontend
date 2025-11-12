import { clsx } from "clsx";
import { parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formateDate = (date) => {
  return formatDistanceToNow(parseISO(date), { addSuffix: true });
};

export const formatDateInDDMMYYY = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
};
