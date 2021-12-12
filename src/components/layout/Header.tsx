import { Menu } from './Menu'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Logo />
      <Menu />
    </header>
  )
}

const Logo = () => (
  <h1 className="font-norwester text-orange text-3xl">
    <Link href="/">
      <a className="cursor-pointer">
        <span className="hidden sm:block">Guess The Game!</span>
        <span className="sm:hidden">GG!</span>
      </a>
    </Link>
  </h1>
)
