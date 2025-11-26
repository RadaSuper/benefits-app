import z from 'zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'
import { Close, Content, Description, Dialog, Overlay, Portal, Title, Trigger } from '@radix-ui/react-dialog'

const validation = z.object({ name: z.string().min(1) })

type FormType = z.infer<typeof validation>

interface FormDialogProps {
  title: string
  defaultValues?: FormType
  TriggerIcon: typeof PlusIcon
  onSubmit: (data: FormType) => void
}

export const FormDialog = (props: FormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { register, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(validation),
    defaultValues: props.defaultValues,
  })

  useEffect(() => {
    if (isOpen) reset(props.defaultValues)
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Trigger className="p-2">
        <span className="sr-only">{props.title}</span>
        <props.TriggerIcon className="w-4 h-4" />
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 bg-black opacity-50" />
        <Content className="top-1/2 left-1/2 fixed -translate-1/2 bg-white rounded-xl p-4 flex flex-col gap-4">
          <div className="flex gap-4 justify-between">
            <Title className="text-2xl">{props.title}</Title>
            <Description />
            <Close className="p-2">
              <span className="sr-only">Close</span>
              <Cross1Icon className="w-4 h-4" />
            </Close>
          </div>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit((data) => {
              reset()
              setIsOpen(false)
              props.onSubmit(data)
            })}
          >
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...register('name')} />
            <button type="submit" className="mt-4">
              Save
            </button>
          </form>
        </Content>
      </Portal>
    </Dialog>
  )
}
