import { HTMLProps } from 'react'

type LevelType = 'h2' | 'h3' | 'h4'

interface TitleProps extends HTMLProps<HTMLHeadingElement> {
  level: LevelType
}
export const Title: React.FC<TitleProps> = ({ level, className = '', ...props }) => {
  const classes = `${className} font-norwester text-2xl text-grey-dark`
  if (level === 'h2') {
    return <h2 className={classes} {...props} />
  }
  if (level === 'h3') {
    return <h3 className={classes} {...props} />
  }
  return <h4 className={classes} {...props} />
}
