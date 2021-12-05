import { useAppSelector } from '../../../redux/redux-hooks'
import { SignInForm } from '../../auth/SignInForm'

export const AuthContainer: React.FC = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <SignInForm />
  }

  return <>{children}</>
}
