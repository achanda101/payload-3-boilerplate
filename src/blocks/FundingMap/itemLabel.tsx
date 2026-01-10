'use client'
import { useRowLabel } from '@payloadcms/ui'

const ItemLabel = () => {
  const { data, rowNumber } = useRowLabel<{ regionName?: string }>()

  const customLabel = data?.regionName || `Region ${String(rowNumber).padStart(2, '0')}`

  return <div>{customLabel}</div>
}

export default ItemLabel
