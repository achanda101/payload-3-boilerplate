import { Link } from '@payloadcms/ui'
import { DoorOpen } from 'lucide-react'

export const Logout = () => {
  return (
    <Link
      aria-label={'Logout'}
      tabIndex={0}
      className="nav__log-out"
      href="/admin/logout"
      style={{ textDecoration: 'none' }}
    >
      <DoorOpen className="h-5 w-5" />
      <span>Logout</span>
    </Link>
  )
}
