'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

// Language code to label mapping
const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  ne: 'Nepali',
  id: 'Bahasa Indonesia',
  km: 'Khmer',
  my: 'Burmese',
  fil: 'Filipino',
  th: 'Thai',
  vi: 'Vietnamese',
  bn: 'Bengali',
  si: 'Sinhala',
  ta: 'Tamil',
  tet: 'Tetum',
  ur: 'Urdu',
  ar: 'Arabic',
  dz: 'Dzongkha',
  ps: 'Pashto',
  'fa-AF': 'Dari',
  zh: 'Chinese',
}

interface TranslationStatus {
  locale: string
  label: string
  fieldsTranslated: number
  totalFields: number
  percentage: number
}

/**
 * Checks if a value has meaningful content
 */
function hasContent(value: any): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'number') return true
  if (typeof value === 'boolean') return true
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') {
    // For objects, check if they have any non-empty values
    return Object.values(value).some((v) => hasContent(v))
  }
  return false
}

/**
 * Analyzes form fields to determine translation status
 */
function analyzeTranslations(formData: any): TranslationStatus[] {
  if (!formData) return []

  const locales = Object.keys(LANGUAGE_LABELS)
  const translationMap: Record<string, { translated: number; total: number }> = {}

  // Initialize counters
  locales.forEach((locale) => {
    translationMap[locale] = { translated: 0, total: 0 }
  })

  // Fields to skip
  const skipFields = new Set([
    'id',
    '_id',
    '_status',
    'createdAt',
    'updatedAt',
    'publishedAt',
    'createdBy',
    'updatedBy',
    'slug',
    'slugLock',
    'translations',
    'translationStatus',
    'meta',
    'folder',
    'deletedAt',
    '_isLocked',
    '_userEditing',
    '_displayStatus',
  ])

  // Check each field
  Object.entries(formData).forEach(([fieldName, fieldValue]) => {
    if (skipFields.has(fieldName)) return
    if (!fieldValue || typeof fieldValue !== 'object') return

    // Check if this field has locale keys
    const keys = Object.keys(fieldValue)
    const localeKeys = keys.filter((key) => locales.includes(key))

    // If this field has locale structure
    if (localeKeys.length > 0) {
      locales.forEach((locale) => {
        if (keys.includes(locale)) {
          translationMap[locale].total++
          if (hasContent(fieldValue[locale])) {
            translationMap[locale].translated++
          }
        }
      })
    }
  })

  // Build status array
  const statuses: TranslationStatus[] = []

  locales.forEach((locale) => {
    const { translated, total } = translationMap[locale]
    if (total > 0) {
      // Only include if there are fields to translate
      const percentage = Math.round((translated / total) * 100)
      statuses.push({
        locale,
        label: LANGUAGE_LABELS[locale],
        fieldsTranslated: translated,
        totalFields: total,
        percentage,
      })
    }
  })

  // Sort: English first, then by percentage (highest first), then alphabetically
  statuses.sort((a, b) => {
    if (a.locale === 'en') return -1
    if (b.locale === 'en') return 1
    if (a.percentage !== b.percentage) return b.percentage - a.percentage
    return a.label.localeCompare(b.label)
  })

  return statuses
}

/**
 * Banner component showing translation status on document edit page
 */
const TranslationStatusBanner: React.FC = () => {
  const formData = useFormFields(([fields]) => fields)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render during SSR to avoid hydration issues
  if (!isClient || !formData) {
    return null
  }

  const translations = analyzeTranslations(formData)

  if (translations.length === 0) {
    return null
  }

  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#1f2937',
        }}
      >
        Translation Progress
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px',
        }}
      >
        {translations.map((translation) => {
          const isComplete = translation.percentage === 100
          const isEmpty = translation.percentage === 0
          const barColor = isComplete ? '#10b981' : isEmpty ? '#e5e7eb' : '#f59e0b'
          const textColor = isComplete ? '#065f46' : isEmpty ? '#6b7280' : '#92400e'

          return (
            <div
              key={translation.locale}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: textColor,
                  }}
                >
                  {translation.label}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: textColor,
                  }}
                >
                  {translation.percentage}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${translation.percentage}%`,
                    height: '100%',
                    backgroundColor: barColor,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  marginTop: '4px',
                }}
              >
                {translation.fieldsTranslated} of {translation.totalFields} fields
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TranslationStatusBanner
