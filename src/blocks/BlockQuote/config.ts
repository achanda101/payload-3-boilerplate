import type { Block } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BlockQuote: Block = {
  slug: 'blckquote',
  labels: {
    singular: 'BlockQuote',
    plural: 'BlockQuotes',
  },
  interfaceName: 'BlockQuote',
  fields: [
    {
      name: 'quote_text',
      label: 'Quote Text',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'attrib_name',
      label: 'Attribution Name',
      type: 'text',
      localized: true,
    },
    {
      name: 'attrib_dsg',
      label: 'Attribution Designation',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: () => [BoldFeature(), ItalicFeature(), UnderlineFeature(), LinkFeature({})],
      }),
    },
  ],
}
