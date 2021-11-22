import { UserIcon } from '../../styles/icons/UserIcon'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

export const Menu = () => {
  const router = useRouter()

  return (
    <ul className="relative flex items-center bg-white p-2 rounded-2xl text-lg font-norwester">
      <MenuItem href="/play" isActive={router.pathname.startsWith('/play')}>
        Play
      </MenuItem>
      <MenuItem
        href="/leaderboard"
        isActive={router.pathname.startsWith('/leaderboard')}
      >
        Leaderboard
      </MenuItem>
      <MenuItem
        href="/account"
        isActive={router.pathname.startsWith('/account')}
        center
      >
        <UserIcon className="w-7" />
      </MenuItem>
    </ul>
  )
}

interface MenuItemProps {
  href: string
  isActive: boolean
  center?: true
}
const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href,
  isActive,
  center,
}) => (
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
