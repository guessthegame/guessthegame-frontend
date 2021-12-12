import { FieldError } from 'react-hook-form'

interface InputErrorMessageProps {
  error?: FieldError
}
export const InputErrorMessage = ({ error }: InputErrorMessageProps) => {
  if (!error) {
    return null
  }
  return <p className="text-orange">{error.message}</p>
}
