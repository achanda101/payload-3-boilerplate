import React from 'react'
import Image from 'next/image'
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

  return (
    <div className={containerClassName}>
      <Image
        src={(uploadFields.url as string) || ''}
        alt={(uploadFields.alt as string) || ''}
        width={width}
        height={height}
        className="w-full object-cover"
        style={{
          objectPosition: `${(uploadFields.focalX as number) ?? 50}% ${(uploadFields.focalY as number) ?? 50}%`,
        }}
      />
      <div className={captionClassName}>{uploadFields.caption}</div>
    </div>
  )
}

export default UploadRenderer
