'use client'
import { useRowLabel } from '@payloadcms/ui'

const ColumnRowLabel = () => {
  const { rowNumber } = useRowLabel()

  const columnLabels = ['Column 1', 'Column 2', 'Column 3']
  const customLabel =
    rowNumber !== undefined ? columnLabels[rowNumber] || `Column ${rowNumber + 1}` : 'Column'

  return <div>{customLabel}</div>
}

export default ColumnRowLabel
