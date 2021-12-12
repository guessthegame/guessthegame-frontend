import { SVGProps } from 'react'

export const RightArrowIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 30 30" className={`fill-current ${className}`} {...props}>
    <path d="M8.293,27.707a1,1,0,0,0,1.414,0l12-12a1,1,0,0,0,0-1.414l-12-12A1,1,0,0,0,8.293,3.707L19.586,15,8.293,26.293A1,1,0,0,0,8.293,27.707Z"></path>
  </svg>
)
