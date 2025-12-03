import Link from 'next/link'

interface PDFViewerProps {
  url: string
  alt?: string
  caption?: string
}

export const PDFViewer = ({ url, alt, caption }: PDFViewerProps) => {
  // Use iframe as a simple, reliable PDF viewer fallback
  return (
    <>
      <div style={{ height: '500px', width: '100%', border: '1px solid #e5e7eb' }}>
        <iframe
          src={`${url}#toolbar=1&navpanes=0&scrollbar=1`}
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
