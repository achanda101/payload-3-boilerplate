'use client'
import { useRowLabel } from '@payloadcms/ui'


const GrantCardSpecRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ spec?: string }>()

  const customLabel = `${data?.spec}` || `Grant Detail ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default GrantCardSpecRowLabel;