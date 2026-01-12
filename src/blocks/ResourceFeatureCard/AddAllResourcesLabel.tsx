'use client'

import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

const collectionLabels: Record<string, string> = {
  blog: 'Add All Blogposts pages?',
  reports: 'Add All Reports pages?',
  mmedia: 'Add All Multimedia pages?',
}

const AddAllResourcesLabel: React.FC = () => {
  // Get the collection slug from the document context
  const { collectionSlug } = useDocumentInfo()

  // Don't render for pages collection
  if (!collectionSlug || collectionSlug === 'pages') {
    return null
  }

  // Determine the label based on the collection
  const label = collectionLabels[collectionSlug] || 'Add All Resources?'

  return <>{label}</>
}

export default AddAllResourcesLabel
