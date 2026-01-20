'use client'

import { useRowLabel } from '@payloadcms/ui'

const RowRowLabel = () => {
  const { rowNumber } = useRowLabel()
  const customLabel = rowNumber !== undefined ? `Row ${rowNumber + 1}` : 'Row'
  return <div>{customLabel}</div>
}

export default RowRowLabel
