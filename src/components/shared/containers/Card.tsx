import { HTMLProps } from 'react'

export const Container: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={`rounded-3xl bg-white p-5 ${className}`} {...props}>
    {children}
  </div>
)
