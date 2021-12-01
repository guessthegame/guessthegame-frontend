import { Title } from '../typography/Title'
import { Container } from './Card'

interface SmallContainerProps {
  title?: string
}
export const SmallContainer: React.FC<SmallContainerProps> = ({ children, title }) => (
  <Container className="max-w-lg mx-auto mt-10">
    {title ? (
      <Title level="h2" className="text-center">
        {title}
      </Title>
    ) : null}
    {children}
  </Container>
)
