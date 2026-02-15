'use client'
import { useRowLabel } from '@payloadcms/ui'

const BadgeItemLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string }>()

  const customLabel = data?.label
    ? data.label
    : `Badge ${String(rowNumber).padStart(2, '0')}`

  return <div>{customLabel}</div>
}

export default BadgeItemLabel
