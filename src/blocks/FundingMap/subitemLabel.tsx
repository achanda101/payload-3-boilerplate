'use client'
import { useRowLabel } from '@payloadcms/ui'

const SubitemLabel = () => {
  const { data, rowNumber } = useRowLabel<{ statnumber?: string }>()

  const customLabel = data?.statnumber || `Stat ${String(rowNumber).padStart(2, '0')}`

  return <div>{customLabel}</div>
}

export default SubitemLabel
