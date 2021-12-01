import { HTMLProps, forwardRef } from 'react'

export const TextInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(function TInput(
  { className, ...props },
  ref
) {
  return (
    <input
      className={`border border-gray-300 p-2 rounded mt-1 w-full ${className}`}
      {...props}
      ref={ref}
    />
  )
})
