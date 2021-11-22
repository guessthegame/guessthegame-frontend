import { Header } from './Header'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto max-w-6xl px-3 sm:px-10 2xl:px-0 py-1 sm:py-3 ">
      <Header />
      <main>{children}</main>
    </div>
  )
}
