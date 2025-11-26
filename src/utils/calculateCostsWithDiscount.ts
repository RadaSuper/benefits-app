import { DISCOUNT_RATE } from './constants'

/**
 * Applies a 10% discount to healthcare costs for employees/dependents
 * whose names start with 'A' (case-insensitive).
 *
 * @param name - The name of the employee or dependent
 * @param cost - The annual cost of healthcare benefits
 * @returns The cost after applying any applicable discount
 */
export function calculateCostsWithDiscount(name: string, cost: number) {
  if (!name.toUpperCase().startsWith('A')) return cost

  return cost * (1 - DISCOUNT_RATE)
}
