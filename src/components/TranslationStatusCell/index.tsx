'use client'

import React from 'react'

// Language code to label mapping
const LANGUAGE_LABELS: Record<string, string> = {
  en: 'EN',
  hi: 'HI',
  ne: 'NE',
  id: 'ID',
  km: 'KH',
  my: 'MY',
  fil: 'FIL',
  th: 'TH',
  vi: 'VI',
  bn: 'BN',
  si: 'SI',
  ta: 'TA',
  tet: 'TET',
  ur: 'UR',
  ar: 'AR',
  dz: 'DZ',
  ps: 'PS',
  'fa-AF': 'FA',
  zh: 'ZH',
}

interface TranslationStatus {
  locale: string
  label: string
  status: 'full' | 'partial'
  fieldsTranslated: number
  totalFields: number
}

/**
 * Analyzes a document to determine which languages have translations
 * @param data - The document data
 * @returns Array of translation statuses for languages with content
 */
function analyzeTranslations(data: any): TranslationStatus[] {
  if (!data) return []

  const locales = Object.keys(LANGUAGE_LABELS)
  const translationMap: Record<
    string,
    { translated: number; total: number }
  > = {}

  // Initialize counters for each locale
  locales.forEach((locale) => {
    translationMap[locale] = { translated: 0, total: 0 }
  })

  // Fields to skip during recursion
  const skipFields = new Set([
    'id',
    '_id',
    '_status',
    'createdAt',
    'updatedAt',
    'publishedAt',
    'createdBy',
    'updatedBy',
    'translations',
    'meta', // Skip meta/SEO fields as they may have their own structure
  ])

  // Recursively check all fields in the document
  const checkField = (value: any, depth = 0): void => {
    // Prevent infinite recursion
    if (depth > 10) return

    if (!value || typeof value !== 'object') return

    const keys = Object.keys(value)
    if (keys.length === 0) return

    // Special case: if the ONLY key is "id", it's not a localized field
    // (it's just a document ID, not Bahasa Indonesia)
    if (keys.length === 1 && keys[0] === 'id') {
      return
    }

    // Check if this object has locale keys
    const localeKeys = keys.filter((key) => locales.includes(key))

    // Special case: exclude "id" from being counted as a locale key
    const nonIdLocaleKeys = localeKeys.filter((key) => key !== 'id')

    // Determine if this is a localized field:
    // 1. Must have at least 1 non-"id" locale key (prevents "id" only matches)
    // 2. At least 50% of keys should be locales (handles fields with metadata)
    const localeRatio = localeKeys.length / keys.length
    const isLocalizedField = nonIdLocaleKeys.length >= 1 && localeRatio >= 0.5

    if (isLocalizedField) {
      // This looks like a localized field, check each locale that exists
      locales.forEach((locale) => {
        if (keys.includes(locale)) {
          translationMap[locale].total++
          const localeValue = value[locale]
          if (hasContent(localeValue)) {
            translationMap[locale].translated++
          }
        }
      })
    } else {
      // Not a localized field, recurse into nested objects/arrays
      if (Array.isArray(value)) {
        value.forEach((item) => checkField(item, depth + 1))
      } else {
        Object.entries(value).forEach(([key, val]) => {
          if (!skipFields.has(key)) {
            checkField(val, depth + 1)
          }
        })
      }
    }
  }

  // Check all fields in the document
  checkField(data)

  // Debug: log what we found
  if (process.env.NODE_ENV === 'development') {
    const hasTranslations = Object.values(translationMap).some((t) => t.total > 0)
    if (!hasTranslations) {
      console.log('TranslationStatusCell: No translations found in data:', data)
      // Log specific fields that should be localized
      console.log('heroTitle:', data?.heroTitle)
      console.log('heroSubtitle:', data?.heroSubtitle)
      console.log('All keys:', Object.keys(data || {}))
    }
  }

  // Build translation status array for locales with content
  const statuses: TranslationStatus[] = []

  locales.forEach((locale) => {
    const { translated, total } = translationMap[locale]

    // Only include locales that have at least some translation
    if (translated > 0 && total > 0) {
      statuses.push({
        locale,
        label: LANGUAGE_LABELS[locale],
        status: translated === total ? 'full' : 'partial',
        fieldsTranslated: translated,
        totalFields: total,
      })
    }
  })

  // Sort: English first, then fully translated, then partially translated, then alphabetically
  statuses.sort((a, b) => {
    if (a.locale === 'en') return -1
    if (b.locale === 'en') return 1
    if (a.status === 'full' && b.status === 'partial') return -1
    if (a.status === 'partial' && b.status === 'full') return 1
    return a.label.localeCompare(b.label)
  })

  return statuses
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
  if (typeof value === 'object') return Object.keys(value).length > 0
  return false
}

interface TranslationStatusCellProps {
  data: any
  rowData: any
}

/**
 * Custom cell component that displays translation status badges
 */
const TranslationStatusCell: React.FC<TranslationStatusCellProps> = ({
  data,
  rowData,
}) => {
  const translations = analyzeTranslations(rowData)

  if (translations.length === 0) {
    return (
      <div style={{ color: '#999', fontSize: '0.875rem' }}>
        No translations
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        alignItems: 'center',
      }}
    >
      {translations.map((translation) => {
        const isFullyTranslated = translation.status === 'full'
        const backgroundColor = isFullyTranslated ? '#10b981' : '#f59e0b'

        return (
          <span
            key={translation.locale}
            style={{
              display: 'inline-block',
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor,
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: '600',
              lineHeight: '1.2',
            }}
          >
            {translation.label}
          </span>
        )
      })}
    </div>
  )
}

export default TranslationStatusCell
