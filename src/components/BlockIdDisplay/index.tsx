'use client'
import React from 'react'
import { useForm, FieldLabel } from '@payloadcms/ui'

export const BlockIdDisplay: React.FC<{ path?: string }> = ({ path }) => {
  const { getDataByPath } = useForm()

  // path is "contentBlocks.0.blockAnchorId" — get the parent block path
  const blockPath = path ? path.replace(/\.blockAnchorId$/, '') : ''
  const blockData = getDataByPath(blockPath) as { id?: string } | undefined
  const id = blockData?.id

  return (
    <div className="field-type text" style={{ border: '1px solid #d1d5db', marginTop: '1rem', backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '4px' }}>
      <FieldLabel label="Block Anchor ID" />
      <input
        type="text"
        value={id || 'ID will be generated after saving'}
        readOnly
        disabled
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '0.875rem',
          fontFamily: 'monospace',
          backgroundColor: '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          color: '#374151',
          cursor: 'not-allowed',
        }}
      />
      <div
        style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#6b7280',
        }}
      >
        Use this ID in link fields to create anchor links to this specific block
      </div>
    </div>
  )
}
