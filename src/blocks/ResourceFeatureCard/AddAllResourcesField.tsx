'use client'

import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'
import { CheckboxField } from '@payloadcms/ui'
import type { CheckboxFieldClientComponent } from 'payload'

const collectionLabels: Record<string, string> = {
  blog: 'Add All Blogposts pages?',
  reports: 'Add All Reports pages?',
  mmedia: 'Add All Multimedia pages?',
}

const AddAllResourcesField: CheckboxFieldClientComponent = (props) => {
  const { collectionSlug, globalSlug } = useDocumentInfo()

  // Don't render for pages collection or homepage global
  if (collectionSlug === 'pages' || globalSlug === 'homepage') {
    return null
  }

  // Determine the label based on the collection
  const label = collectionSlug ? collectionLabels[collectionSlug] || 'Add All Resources?' : 'Add All Resources?'

  return <CheckboxField {...props} label={label} />
}

export default AddAllResourcesField
