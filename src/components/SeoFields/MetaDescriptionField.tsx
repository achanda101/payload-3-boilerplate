'use client'
import React, { useCallback } from 'react'
import { TextareaInput, FieldLabel, useField, useForm } from '@payloadcms/ui'

type Props = {
  path: string
  label?: string
  required?: boolean
}

export const MetaDescriptionField: React.FC<Props> = ({
  path,
  label = 'Meta Description',
  required,
}) => {
  const { value, setValue } = useField<string>({ path })
  const { getData } = useForm()

  const generateDescription = useCallback(() => {
    const data = getData()
    const heroSubtitle = data?.heroSubtitle as string | undefined

    if (heroSubtitle) {
      setValue(heroSubtitle)
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
          onClick={generateDescription}
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
        Description for search engines and social sharing. Recommended: 120-160 characters.
      </div>
      <TextareaInput path={path} onChange={setValue} value={value || ''} />
    </div>
  )
}
