import { Toaster } from 'react-hot-toast'

export const GlobalToaster = (): JSX.Element => (
  <Toaster toastOptions={{ duration: 6000, loading: { duration: Infinity } }} />
)
