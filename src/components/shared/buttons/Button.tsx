import { HTMLProps } from 'react'

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit'
}
export const Button: React.FC<ButtonProps> = ({ className, type = 'button', ...props }) => (
  <button
    className={`transition-all rounded bg-orange hover:bg-orange-dark text-white px-3 py-1 font-norwester ${className}`}
    {...props}
    type={type}
  />
)
