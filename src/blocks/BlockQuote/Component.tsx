import React from 'react'
import Image from 'next/image'
import { serializeLexical } from '@/components/RichText/serializeRichText'

interface BlockQuoteProps {
  id?: string
  quote_text?: string
  attrib_name?: string
  attrib_dsg?: any
  blockType?: 'blckquote'
}

export const BlockQuoteBlock: React.FC<BlockQuoteProps> = ({
  quote_text,
  attrib_name,
  attrib_dsg,
}) => {
  return (
    // <div className="mt-[4rem] mb-[4rem] last:mb-0">
    <div>
      <Image
        src="/block_icons/blockquote.svg"
        alt="Opening Quote"
        width={100}
        height={100}
        className="mb-6"
      />
      {quote_text && <h5 style={{ whiteSpace: 'pre-line' }}>{quote_text}</h5>}
      {attrib_name && <p className="italic text-right">- {attrib_name}</p>}
      {attrib_dsg && (
        <div className="italic text-right">{serializeLexical({ nodes: attrib_dsg.root.children })}</div>
      )}
    </div>
  )
}
