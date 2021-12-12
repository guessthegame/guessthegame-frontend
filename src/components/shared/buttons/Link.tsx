import NextLink, { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends NextLinkProps {
  className?: string
}
export const Link: React.FC<LinkProps> = ({ children, className = '', ...props }) => (
  <NextLink {...props}>
    <a className={`text-orange hover:underline ${className}`}>{children}</a>
  </NextLink>
)
