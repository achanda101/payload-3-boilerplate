import Link from 'next/link'

interface PDFViewerProps {
  url: string
  alt?: string
  caption?: string
}

export const PDFViewer = ({ url, alt, caption }: PDFViewerProps) => {
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid PDF URL provided')
  }

  return (
    <>
      <div style={{ height: '500px', width: '100%', border: '1px solid #e5e7eb' }}>
        <iframe
          src={url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title={alt || 'PDF Viewer'}
        />
      </div>
      {(caption || url) && (
        <div className="mt-3 flex items-center justify-between gap-4">
          {caption && <div className="small mt-1">{caption}</div>}
          {url && (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="small mt-1 underline whitespace-nowrap"
            >
              Open PDF in new tab
            </Link>
          )}
        </div>
      )}
    </>
  )
}
