import { TrashIcon } from '@radix-ui/react-icons'
import { useAppState, type Dependent, type Employee } from '../state'
import { UpdateDependentDialog } from './DependentDialog'

interface Props {
  employeeId: Employee['id']
  dependent: Dependent
}

export const DependentRecord = (props: Props) => {
  const { removeDependent } = useAppState()

  return (
    <div className="flex bg-gray-100 rounded-xl p-1">
      <div className="flex gap-1">
        {props.dependent.name}
        <UpdateDependentDialog dependent={props.dependent} />
        <button onClick={() => removeDependent(props.employeeId, props.dependent.id)} className="p-2">
          <span className="sr-only">Remove dependent {props.dependent.name}</span>
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
