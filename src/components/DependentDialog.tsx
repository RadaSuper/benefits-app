import { GearIcon, PlusIcon } from '@radix-ui/react-icons'
import { useAppState, type Dependent, type Employee } from '../state'
import { FormDialog } from './Dialog'

interface AddDependentDialogProps {
  employeeId: Employee['id']
}

export const AddDependentDialog = (props: AddDependentDialogProps) => {
  const { addDependent } = useAppState()

  return (
    <FormDialog
      title="Add Dependent"
      TriggerIcon={PlusIcon}
      onSubmit={({ name }) => addDependent(props.employeeId, name)}
    />
  )
}

interface UpdateDependentDialogProps {
  dependent: Dependent
}

export const UpdateDependentDialog = (props: UpdateDependentDialogProps) => {
  const { updateDependent } = useAppState()

  return (
    <FormDialog
      title="Update Dependent"
      TriggerIcon={GearIcon}
      defaultValues={props.dependent}
      onSubmit={(data) => updateDependent(props.dependent.id, data)}
    />
  )
}
