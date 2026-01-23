'use client'
import React, { useCallback } from 'react'
import { TextInput, FieldLabel, useField, useForm } from '@payloadcms/ui'

type Props = {
  path: string
  label?: string
  required?: boolean
}

export const MetaTitleField: React.FC<Props> = ({ path, label = 'Meta Title', required }) => {
  const { value, setValue } = useField<string>({ path })
  const { getData } = useForm()

  const generateTitle = useCallback(() => {
    const data = getData()
    const heroTitle = data?.heroTitle as string | undefined

    if (heroTitle) {
      setValue(`${heroTitle} | Urgent Action Fund Asia & Pacific`)
    } else {
      setValue('Urgent Action Fund Asia & Pacific')
    }
  }, [getData, setValue])

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <FieldLabel label={label} path={path} required={required} />
        <span style={{ color: '#9A9A9A' }}>—</span>
        <button
          type="button"
          onClick={generateTitle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--theme-elevation-800)',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
            fontSize: '13px',
          }}
        >
          Auto-generate
        </button>
      </div>
      <div style={{ color: '#9A9A9A', fontSize: '12px', marginBottom: '8px' }}>
        Title for search engines and social sharing. Recommended: 50-60 characters.
      </div>
      <TextInput path={path} onChange={setValue} value={value || ''} />
    </div>
  )
}
