import { Title } from '../typography/Title'
import { Card } from './Card'

interface ContainerWithTitleProps {
  title?: string
  className?: string
}
export const ContainerWithTitle: React.FC<ContainerWithTitleProps> = ({
  children,
  title,
  className,
}) => (
  <Card className={`mx-auto mt-10 ${className}`}>
    {title ? (
      <Title level="h2" className="text-center">
        {title}
      </Title>
    ) : null}
    {children}
  </Card>
)

export const SmallContainer: React.FC<ContainerWithTitleProps> = ({ className, ...props }) => (
  <ContainerWithTitle className={`max-w-lg ${className}`} {...props} />
)

export const MediumContainer: React.FC<ContainerWithTitleProps> = ({ className, ...props }) => (
  <ContainerWithTitle className={`max-w-2xl ${className}`} {...props} />
)
