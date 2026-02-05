import React from 'react'
import { OptimizedImage } from '@/components/OptimizedImage'
import { PDFViewer } from '@/components/PDFViewer'

interface UploadFields {
  url: string
  alt?: string
  caption?: string
  mimeType?: string
  filename?: string
  width?: number
  height?: number
  focalX?: number
  focalY?: number
  blurhash?: string
}

interface UploadRendererProps {
  uploadFields: UploadFields
  topMargin: string
}

function UploadRenderer({ uploadFields, topMargin }: UploadRendererProps) {
  // Check if the file is a PDF
  const isPDF = uploadFields.mimeType?.includes('application/pdf')

  if (isPDF) {
    // Render PDF using PDFViewer component
    return (
      <div
        className={`col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMargin} mb-[2rem] md:mb-[4rem] last:mb-0`}
      >
        <PDFViewer url={uploadFields.url} alt={uploadFields.alt} caption={uploadFields.caption} />
      </div>
    )
  }

  // Render as an image
  const width = (uploadFields.width as number) || 600
  const height = (uploadFields.height as number) || 400
  const isPortrait = width / height < 1.3

  const containerClassName = isPortrait
    ? `col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMargin} mb-[2rem] md:mb-[4rem] last:mb-0`
    : `col-span-full md:col-span-8 md:col-start-1 lg:col-span-10 lg:col-start-2 ${topMargin} mb-[2rem] md:mb-[4rem] last:mb-0`

  const captionClassName = isPortrait ? 'small mt-3' : 'small mt-3 md:w-2/3'

  // Construct a media object for OptimizedImage
  const mediaObject = {
    url: uploadFields.url,
    alt: uploadFields.alt || '',
    width: uploadFields.width,
    height: uploadFields.height,
    focalX: uploadFields.focalX,
    focalY: uploadFields.focalY,
    blurhash: uploadFields.blurhash,
  }

  return (
    <div className={containerClassName}>
      <OptimizedImage
        media={mediaObject as any}
        width={width}
        height={height}
        className="w-full object-cover"
      />
      <div className={captionClassName}>{uploadFields.caption}</div>
    </div>
  )
}

export default UploadRenderer
