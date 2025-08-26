'use client'
import { useRowLabel } from '@payloadcms/ui'

const NavItemRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string }>()

  const customLabel = `${data.label}` || `Nav Item ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default NavItemRowLabel;