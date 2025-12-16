'use client'
import { useRowLabel } from '@payloadcms/ui'

const LinkLabel = () => {
  const { data, rowNumber } = useRowLabel<{ link?: { label?: string } }>()

  const customLabel = `${data?.link?.label}` || `Link ${String(rowNumber).padStart(2, '0')}`

  return <div>{customLabel}</div>
}

export default LinkLabel
