import { Header } from './Header'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { refreshTokens } from '../../services/api/auth'
import { stopLoading } from '../../redux/slices/auth.slice'

export const Layout: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  // Try to connect the user
  useEffect(() => {
    ;(async () => {
      try {
        await refreshTokens()
      } catch (err) {
        dispatch(stopLoading())
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto max-w-6xl px-3 sm:px-10 2xl:px-0 py-1 sm:py-3 ">
      <Header />
      <main>{children}</main>
    </div>
  )
}
