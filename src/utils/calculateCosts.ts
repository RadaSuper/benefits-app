import type { Dependent, Employee } from '../state'
import { calculateCostsWithDiscount } from './calculateCostsWithDiscount'
import { ANNUAL_DEPENDENT_COST, ANNUAL_EMPLOYEE_COST, EMPLOYEE_PAYCHECK_AMOUNT, PAYCHECKS_PER_YEAR } from './constants'

/**
 * Calculates comprehensive healthcare benefits costs for an employee and their dependents.
 *
 * This function breaks down costs in multiple ways:
 * 1. Annual breakdown (by employee, by dependents, and total)
 * 2. Per-paycheck breakdown (costs divided by 26 paychecks)
 * 3. Net salary calculations (salary minus benefits costs)
 *
 * @param employee - The employee object (includes their name for discount eligibility)
 * @param dependents - Array of dependents under this employee
 * @returns Object containing annual, per-paycheck, and net salary calculations
 */
export function calculateCosts(employee: Employee, dependents: Dependent[]) {
  const annualSalary = PAYCHECKS_PER_YEAR * EMPLOYEE_PAYCHECK_AMOUNT

  // Apply discount based on employee name
  const employeeCost = calculateCostsWithDiscount(employee.name, ANNUAL_EMPLOYEE_COST)

  // Calculate dependent costs with individual discount eligibility
  const dependentsCost = dependents.reduce((total, dependent) => {
    total += calculateCostsWithDiscount(dependent.name, ANNUAL_DEPENDENT_COST)

    return total
  }, 0)

  const totalCost = employeeCost + dependentsCost
  const employeePerPaycheck = employeeCost / PAYCHECKS_PER_YEAR
  const dependentsPerPaycheck = dependentsCost / PAYCHECKS_PER_YEAR
  const totalCostPerPaycheck = employeePerPaycheck + dependentsPerPaycheck

  return {
    annualSalary,
    employeeCost,
    dependentsCost,
    totalCost,
    employeePerPaycheck,
    dependentsPerPaycheck,
    totalCostPerPaycheck,
    // Net salary after healthcare benefits deduction
    annualSalaryWithBenefits: annualSalary - totalCost,
    paycheckSalaryWithBenefits: EMPLOYEE_PAYCHECK_AMOUNT - totalCostPerPaycheck,
  }
}
