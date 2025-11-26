import { useAppState } from './state'
import { EmployeeRow } from './components/EmployeeRow'
import { AddEmployeeDialog } from './components/EmployeeDialog'

export const App = () => {
  const { getEmployeesArray } = useAppState()
  const employees = getEmployeesArray()

  return (
    <div className="m-4 flex flex-col gap-4">
      <header className="flex justify-between">
        <h1>Employees:</h1>
        <AddEmployeeDialog />
      </header>
      <div className="flex flex-col gap-2">
        {employees.map((employee) => (
          <EmployeeRow key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  )
}
