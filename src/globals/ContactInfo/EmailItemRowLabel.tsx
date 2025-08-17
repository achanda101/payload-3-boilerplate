'use client'

import { useRowLabel } from '@payloadcms/ui'

const EmailItemRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string }>()

  const customLabel = `${data.label}` || `Email Contact' ${String(rowNumber).padStart(2, '0')}`

  return <div>{customLabel}</div>
}

export default EmailItemRowLabel;