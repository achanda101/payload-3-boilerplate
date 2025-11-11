import { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  BoldFeature,
  UnderlineFeature,
  ItalicFeature,
  LinkFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";

export const MultiStepProcess: Block = {
  slug: 'mstepProcess',
  labels: {
    singular: 'Multi-step Process Block',
    plural: 'Multi-step Process Blocks'
  },
  imageURL: '/block_icons/multistep-process-block-icon.png',
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
          name: 'subtitle',
          label: 'Description of the process',
          type: 'text',
          localized: true,
          admin: {
            width: '50%'
          }
        },
      ]
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'stepTitle',
          type: 'text',
          localized: true,
        },
        {
          label: 'Content',
          type: 'group',
          admin: {
            description: 'Fill in the details for the step'
          },
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
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Document', value: 'FileText' },
                    { label: 'Time', value: 'Clock' },
                    { label: 'Verification', value: 'ShieldCheck' },
                    { label: 'Notification', value: 'Vote' },
                    { label: 'Documentation', value: 'ScrollText' },
                    { label: 'Funds', value: 'Banknote' },
                    { label: 'Action', value: 'Rocket' },
                    { label: 'Report', value: 'FileCheck' },
                  ],
                  defaultValue: 'FileText',
                  admin: {
                    width: '50%'
                  }
                },
              ]
            },
            {
              name: 'details',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'bullet',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: [
                      BoldFeature(),
                      UnderlineFeature(),
                      ItalicFeature(),
                      LinkFeature({
                        enabledCollections: [ 'grants' ],
                      }),
                      InlineToolbarFeature(),
                    ],
                  }),
                  localized: true
                }
              ],
              admin: {
                description: 'Enter details for the step in bullet form',
              }
            },
            {
              name: 'tip',
              admin: {
                description: 'Enter any extra information that maybe useful in the step.'
              },
              type: 'richText',
              editor: lexicalEditor({
                features: [
                  BoldFeature(),
                  UnderlineFeature(),
                  ItalicFeature(),
                  LinkFeature({
                    enabledCollections: [ 'grants' ],
                  }),
                  InlineToolbarFeature(),
                ],
              }),
              localized: true
            }
          ]
        },
      ],
      admin: {
        components: {
          RowLabel: {
            path: 'src/blocks/MultiStepProcessBlock/StepTitlesRowLabel.tsx'
          }
        }
      }
    }
  ]
}