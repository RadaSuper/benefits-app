import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface Employee {
  id: string
  name: string
  dependentIds: string[]
}

export interface Dependent {
  id: string
  name: string
}

interface State {
  employees: Record<Employee['id'], Employee>
  dependents: Record<Dependent['id'], Dependent>

  getEmployeesArray: () => Employee[]
  getDependentsArray: (employeeId: Employee['id']) => Dependent[]

  addEmployee: (name: Employee['name']) => void
  updateEmployee: (id: Employee['id'], changes: Pick<Employee, 'name'>) => void
  removeEmployee: (id: Employee['id']) => void

  addDependent: (employeeId: Employee['id'], name: Dependent['name']) => void
  updateDependent: (id: Dependent['id'], changes: Pick<Dependent, 'name'>) => void
  removeDependent: (employeeId: Employee['id'], dependentId: string) => void
}

export const useAppState = create<State>()(
  persist(
    immer((set, get) => ({
      employees: {},
      dependents: {},

      // Convert employee records to array for component iteration
      getEmployeesArray: () => Object.values(get().employees),

      // Get all dependents for a specific employee
      getDependentsArray: (employeeId: Employee['id']) => {
        const { employees, dependents } = get()

        return employees[employeeId].dependentIds.map((dependentId) => dependents[dependentId])
      },

      addEmployee: (name) =>
        set((state) => {
          const id = uuid()

          state.employees[id] = { id, name, dependentIds: [] }
        }),
      updateEmployee: (id, changes) =>
        set((state) => {
          Object.assign(state.employees[id], changes)
        }),
      removeEmployee: (id) =>
        set((state) => {
          state.employees[id].dependentIds.forEach((id) => delete state.dependents[id])

          delete state.employees[id]
        }),

      addDependent: (employeeId, name) =>
        set((state) => {
          const dependentId = uuid()

          state.employees[employeeId].dependentIds.push(dependentId)
          state.dependents[dependentId] = { id: dependentId, name }
        }),
      updateDependent: (id, changes) =>
        set((state) => {
          Object.assign(state.dependents[id], changes)
        }),
      removeDependent: (employeeId, dependentId) =>
        set((state) => {
          state.employees[employeeId].dependentIds = state.employees[employeeId].dependentIds.filter(
            (id) => id !== dependentId,
          )
          delete state.dependents[dependentId]
        }),
    })),
    { name: 'employees' },
  ),
)
