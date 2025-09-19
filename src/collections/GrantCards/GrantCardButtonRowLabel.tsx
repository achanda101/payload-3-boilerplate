'use client'
import { useRowLabel } from '@payloadcms/ui'


const GrantCardButtonRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ link?: { label?: string } }>()

  const customLabel = `${data?.link?.label}` || `Card Button ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default GrantCardButtonRowLabel;