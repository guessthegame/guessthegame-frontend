import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useAppSelector } from '../../redux/redux-hooks'
import { UserIcon } from '../../styles/icons/UserIcon'

export const Menu = () => {
  const router = useRouter()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  return (
    <ul className="relative flex items-center bg-white p-2 rounded-2xl text-lg font-norwester">
      <MenuItem href="/play" isActive={router.pathname.startsWith('/play')}>
        Play
      </MenuItem>
      <MenuItem href="/leaderboard" isActive={router.pathname.startsWith('/leaderboard')}>
        Leaderboard
      </MenuItem>
      {isLoggedIn ? (
        <MenuItem href="/upload" isActive={router.pathname.startsWith('/upload')}>
          Upload
        </MenuItem>
      ) : null}
      <MenuItem
        href={isLoggedIn ? '/account/me' : '/account/sign-in'}
        isActive={router.pathname.startsWith('/account')}
        center={isLoggedIn}
      >
        {isLoggedIn ? <UserIcon className="w-7" /> : 'Sign in'}
      </MenuItem>
    </ul>
  )
}

interface MenuItemProps {
  href: string
  isActive: boolean
  center?: boolean
}
const MenuItem: React.FC<MenuItemProps> = ({ children, href, isActive, center }) => (
  <li
    className={`px-3  hover:text-grey-dark transition-all ${
      center ? 'flex flex-col items-center' : ''
    } ${isActive ? 'text-grey-dark' : 'text-grey'}`}
  >
    {isActive ? (
      <span
        style={{
          position: 'absolute',
          width: '12px',
          height: '3px',
          background: '#ef4444',
          bottom: 0,
        }}
      />
    ) : null}
    <Link href={href}>
      <a>{children}</a>
    </Link>
  </li>
)
