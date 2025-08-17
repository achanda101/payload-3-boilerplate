'use client'
import { useRowLabel } from '@payloadcms/ui'

const MenuItemRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string }>()
  
  const customLabel = `${data.label}` || `Menu Item ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default MenuItemRowLabel;