'use client'

import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'
import { CheckboxField } from '@payloadcms/ui'
import type { CheckboxFieldClientComponent } from 'payload'

const AddAllResourcesField: CheckboxFieldClientComponent = (props) => {
  const { collectionSlug, globalSlug } = useDocumentInfo()

  // Don't render for pages collection or homepage global
  if (collectionSlug === 'pages' || globalSlug === 'homepage') {
    return null
  }

  return <CheckboxField {...props} />
}

export default AddAllResourcesField
