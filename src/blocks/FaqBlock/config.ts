import { Block } from "payload";
import { link } from "@/fields/link";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  BoldFeature,
  UnderlineFeature,
  ItalicFeature,
  LinkFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";

export const FaqBlock: Block = {
  slug: 'faqBlk',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks'
  },
  imageURL: '/block_icons/faq-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            width: '50%'
          }
        },
        {
          name: 'desc',
          label: 'Description of the FAQ section',
          type: 'text',
          localized: true,
          admin: {
            width: '50%'
          }
        },
      ]
    },
    link({
        appearances: false,
    }),
    {
      name: 'faqs',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'question',
              type: 'text',
              localized: true,
              admin: {
                width: '50%'
              }
            },
            {
              name: 'answer',
              type: 'richText',
              editor: lexicalEditor({
                features: [
                  BoldFeature(),
                  UnderlineFeature(),
                  ItalicFeature(),
                  LinkFeature({
                    enabledCollections: [ 'grants', 'pages' ],
                  }),
                  InlineToolbarFeature(),
                ],
                admin: {
                  placeholder: 'Start typing your content here ...'
                }
              }),
              localized: true,
              admin: {
                description: 'Provide a detailed answer to the question',
                width: '50%'
              }
            }
          ]
        }
      ],
      admin: {
        description: 'Add frequently asked questions to be displayed in this section',
        components: {
          RowLabel: {
            path: 'src/blocks/FaqBlock/FaqRowLabel.tsx',
          }
        },
      }
    },
  ]
};