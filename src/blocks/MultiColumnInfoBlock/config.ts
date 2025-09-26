import { Block } from "payload";
import { link } from "@/fields/link";

import { lexicalEditor } from '@payloadcms/richtext-lexical';
import {
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ParagraphFeature,
  InlineToolbarFeature
} from '@payloadcms/richtext-lexical';

export const MultiColumnInfoBlock: Block = {
  slug: 'mcolInfoBlock',
  labels: {
    singular: 'Multi-Column Info Block',
    plural: 'Multi-Column Info Blocks'
  },
  imageURL: '/block_icons/multi-column-info-block-icon.png',
  fields: [
    {
      name: 'multicols',
      label: 'Info Columns',
      labels: {
        singular: 'Info Column',
        plural: 'Info Columns'
      },
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'colContent',
          label: 'Column Content',
          type: 'richText',
          localized: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              // Text formatting features
              BoldFeature(),
              ItalicFeature(), 
              UnderlineFeature(),
              
              // List features
              UnorderedListFeature(),
              OrderedListFeature(),
              
              // Essential features for basic functionality
              ParagraphFeature(),

              // IMPORTANT: Add the floating toolbar feature
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'addLink',
          type: 'checkbox',
          label: 'Add Link',
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.addLink === true,
            },
            hooks: {
              beforeValidate: [
                ({ siblingData, value }) => {
                  if (siblingData?.addLink !== true) {
                    return undefined;
                  }
                  return value;
                },
              ],
            },
          },
        }),
      ],
      admin: {
        components: {
          RowLabel: {
            path: 'src/blocks/MultiColumnInfoBlock/MultiColArrayRowLabel.tsx',
          }
        }
      }
    },
  ]
}