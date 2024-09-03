import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  const endDate = new Date(date)
  const day = endDate.getDate()
  const month = endDate.getMonth() + 1
  const year = endDate.getFullYear()
  const formatedDay = day.toString().padStart(2, "0")
  const formatedMonth = month.toString().padStart(2, "0")

  return`${formatedDay}/${formatedMonth}/${year}`

}