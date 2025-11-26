import { GearIcon, PlusIcon } from '@radix-ui/react-icons'
import { useAppState, type Employee } from '../state'
import { FormDialog } from './Dialog'

export const AddEmployeeDialog = () => {
  const { addEmployee } = useAppState()

  return <FormDialog title="Add Employee" TriggerIcon={PlusIcon} onSubmit={({ name }) => addEmployee(name)} />
}

interface UpdateEmployeeDialogProps {
  employee: Employee
}

export const UpdateEmployeeDialog = (props: UpdateEmployeeDialogProps) => {
  const { updateEmployee } = useAppState()

  return (
    <FormDialog
      title="Update Employee"
      TriggerIcon={GearIcon}
      defaultValues={props.employee}
      onSubmit={(data) => updateEmployee(props.employee.id, data)}
    />
  )
}
