'use client'
import { useRowLabel } from '@payloadcms/ui'

const CallOutLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()

  const customLabel = `${data?.title}` || `Item ${String(rowNumber).padStart(2, '0')}`

  return <div>{customLabel}</div>
}

export default CallOutLabel
