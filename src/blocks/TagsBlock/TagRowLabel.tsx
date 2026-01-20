'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

export default function TagRowLabel() {
  const { data, rowNumber } = useRowLabel()
  const tagData = data as any

  return <>{tagData?.tag || `Tag ${String(rowNumber).padStart(2, '0')}`}</>
}
