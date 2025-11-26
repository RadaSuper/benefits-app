import { TrashIcon } from '@radix-ui/react-icons'
import { useAppState, type Employee } from '../state'
import { UpdateEmployeeDialog } from './EmployeeDialog'
import { AddDependentDialog } from './DependentDialog'
import { DependentRecord } from './DependentRecord'
import { calculateCosts } from '../utils/calculateCosts'

interface Props {
  employee: Employee
}

export const EmployeeRow = (props: Props) => {
  const { getDependentsArray, removeEmployee } = useAppState()
  const dependents = getDependentsArray(props.employee.id)
  const costs = calculateCosts(props.employee, dependents)

  return (
    <div key={props.employee.id} className="bg-gray-100 rounded-xl p-1 flex flex-col gap-2">
      <div className="flex justify-between flex-1">
        <h2 className="flex align-center font-bold">{props.employee.name}</h2>
        <div className="flex gap-2">
          <UpdateEmployeeDialog employee={props.employee} />
          <button onClick={() => removeEmployee(props.employee.id)} className="p-2">
            <span className="sr-only">Remove employee {props.employee.name}</span>
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="bg-gray-200 rounded-xl p-1 flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-xl">Dependents:</h3>
          <AddDependentDialog employeeId={props.employee.id} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {dependents.map((dependent) => (
            <DependentRecord key={dependent.id} employeeId={props.employee.id} dependent={dependent} />
          ))}
        </div>
        <div>
          <h3 className="text-xl">Summary:</h3>
          <p>Annual salary: {costs.annualSalary}$</p>

          <h3 className="mt-2 text-lg">Per year costs:</h3>
          <p>Employee: {costs.employeeCost.toFixed(2)}$</p>
          <p>Dependents: {costs.dependentsCost.toFixed(2)}$</p>
          <p>Total: {costs.totalCost.toFixed(2)}$</p>

          <h3 className="mt-2 text-lg">Per paycheck costs:</h3>
          <p>Employee: {costs.employeePerPaycheck.toFixed(2)}$</p>
          <p>Dependents: {costs.dependentsPerPaycheck.toFixed(2)}$</p>
          <p>Total: {costs.totalCostPerPaycheck.toFixed(2)}$</p>

          <h3 className="mt-2 text-lg">Salary with benefits:</h3>

          <p>Annual: {costs.annualSalaryWithBenefits.toFixed(2)}$</p>
          <p>Per paycheck: {costs.paycheckSalaryWithBenefits.toFixed(2)}$</p>
        </div>
      </div>
    </div>
  )
}
