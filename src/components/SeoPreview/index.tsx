'use client'
import {
  useAllFormFields,
  useConfig,
  useDocumentInfo,
  useDocumentTitle,
  useForm,
  useLocale,
} from '@payloadcms/ui'
import { reduceToSerializableFields } from '@payloadcms/ui/shared'
import { formatAdminURL } from 'payload/shared'
import React, { useEffect, useState } from 'react'

type Props = {
  descriptionPath?: string
  hasGenerateURLFn?: boolean
  titlePath?: string
  imagePath?: string
  uploadsCollection?: string
}

export const SeoPreviewComponent: React.FC<Props> = (props) => {
  const {
    descriptionPath: descriptionPathFromContext,
    hasGenerateURLFn,
    titlePath: titlePathFromContext,
    imagePath: imagePathFromContext,
    uploadsCollection = 'mediaCloud',
  } = props

  const {
    config: {
      routes: { api },
      serverURL,
    },
  } = useConfig()
  const locale = useLocale()
  const [fields] = useAllFormFields()
  const { getData } = useForm()
  const docInfo = useDocumentInfo()
  const { title } = useDocumentTitle()

  const descriptionPath = descriptionPathFromContext || 'meta.description'
  const titlePath = titlePathFromContext || 'meta.title'
  const imagePath = imagePathFromContext || 'meta.image'

  const {
    [descriptionPath]: { value: metaDescription } = {},
    [titlePath]: { value: metaTitle } = {},
    [imagePath]: { value: metaImage } = {},
    slug: { value: slugValue } = {},
  } = fields

  const [href, setHref] = useState<string | undefined>()
  const [imageUrl, setImageUrl] = useState<string>()

  // Construct URL for preview
  useEffect(() => {
    const baseUrl = serverURL || window.location.origin
    const collectionSlug = docInfo.collectionSlug
    const globalSlug = docInfo.globalSlug
    const docSlug = slugValue as string | undefined

    if (!hasGenerateURLFn) {
      // For collections/globals without generateURL, construct URL from collection slug and document slug
      let constructedUrl = baseUrl

      if (globalSlug === 'homepage' || !docSlug) {
        // Homepage or no slug - just use base URL
        constructedUrl = baseUrl
      } else if (collectionSlug === 'pages') {
        // Pages use root path
        constructedUrl = `${baseUrl}/${docSlug}`
      } else if (collectionSlug) {
        // Other collections use /collection/slug format
        constructedUrl = `${baseUrl}/${collectionSlug}/${docSlug}`
      }

      setHref(constructedUrl)
      return
    }

    // For collections with generateURL function, fetch URL from API
    const endpoint = formatAdminURL({
      apiRoute: api,
      path: '/plugin-seo/generate-url',
    })

    const getHref = async () => {
      // Get serializable form data to avoid circular references
      const formData = getData()
      const serializableDoc = JSON.parse(
        JSON.stringify(formData, (key, value) => {
          // Skip Payload internal properties that cause circular references
          if (key === 'payload' || key === 'db' || key === 'req') return undefined
          return value
        }),
      )

      const genURLResponse = await fetch(endpoint, {
        body: JSON.stringify({
          id: docInfo.id,
          collectionSlug: docInfo.collectionSlug,
          doc: serializableDoc,
          docPermissions: docInfo.docPermissions,
          globalSlug: docInfo.globalSlug,
          hasPublishPermission: docInfo.hasPublishPermission,
          hasSavePermission: docInfo.hasSavePermission,
          initialData: docInfo.initialData,
          initialState: reduceToSerializableFields(docInfo.initialState ?? {}),
          locale: typeof locale === 'object' ? locale?.code : locale,
          title,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { result: newHref } = await genURLResponse.json()
      setHref(newHref)
    }

    void getHref()
  }, [slugValue, locale, docInfo, hasGenerateURLFn, getData, api, title, serverURL])

  // Build the image URL from the metaImage value
  useEffect(() => {
    if (metaImage && typeof metaImage === 'object' && 'url' in metaImage) {
      // If metaImage has a url property directly
      setImageUrl(metaImage.url as string)
    } else if (metaImage && (typeof metaImage === 'string' || typeof metaImage === 'number')) {
      // If metaImage is an ID (string or number), fetch the image
      const fetchImage = async () => {
        try {
          const response = await fetch(`${serverURL}${api}/${uploadsCollection}/${metaImage}`, {
            credentials: 'include',
          })
          if (response.ok) {
            const imageData = await response.json()
            if (imageData?.url) {
              setImageUrl(imageData.url)
            }
          }
        } catch (error) {
          console.error('Error fetching image:', error)
        }
      }
      void fetchImage()
    } else {
      setImageUrl(undefined)
    }
  }, [metaImage, serverURL, api, uploadsCollection])

  return (
    <div style={{ marginBottom: '20px' }}>
      <div>Preview</div>
      <div style={{ color: '#9A9A9A', marginBottom: '5px' }}>
        Exact result listings may vary based on content and search relevancy.
      </div>
      <div
        style={{
          background: 'var(--theme-elevation-50)',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          overflow: 'hidden',
          pointerEvents: 'none',
          width: '100%',
        }}
      >
        {/* Image section - social media card style */}
        {imageUrl && (
          <div
            style={{
              width: '100%',
              height: '200px',
              overflow: 'hidden',
              backgroundColor: '#f0f0f0',
            }}
          >
            <img
              src={imageUrl}
              alt="Meta preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
        {/* Text content section */}
        <div style={{ padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#70757a', marginBottom: '4px' }}>
            <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
              {href || 'https://...'}
            </a>
          </div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1a0dab' }}>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              {metaTitle as string}
            </a>
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#4d5156', lineHeight: '1.4' }}>
            {metaDescription as string}
          </p>
        </div>
      </div>
    </div>
  )
}
