'use client'
import { useRowLabel } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

const ListRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ title?: string }>()
  const [label, setLabel] = useState<string>('')

  useEffect(() => {
    if (data?.title && typeof data.title === 'string' && data.title.trim()) {
      setLabel(data.title)
    } else {
      setLabel(
        rowNumber !== undefined
          ? `Item ${String(rowNumber + 1).padStart(2, '0')}`
          : 'Item',
      )
    }
  }, [data?.title, rowNumber])

  return <div>{label}</div>
}

export default ListRowLabel
