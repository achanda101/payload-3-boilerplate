import { Block } from "payload";
import { link } from "@/fields/link";

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks'
  },
  imageURL: '/block_icons/hero-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'textarea',
          localized: true,
          admin: {
            placeholder: 'Enter title for the Hero',
            width: '50%'
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          admin: {
            placeholder: 'Enter subtitle for the Hero',
            width: '50%'
          },
        },
      ]
    },
    {
      name: 'mascot',
      type: 'upload',
      relationTo: 'assetCloud',
      admin: {
        description: 'Upload a mascot image for the Hero section',
      },
    },
    {
      name: 'bgType',
      label: 'Hero Background Design Type',
      type: 'radio',
      options: [
        { label: 'Coloured Wavy Top', value: 'wavy_top' },
        { label: 'Coloured Wavy Fullscreen', value: 'wavy_full' },
        { label: 'Transparent Wavy Top', value: 'trans_wavy_top' },
        { label: 'Coloured Blob', value: 'blob'}
      ]
    },
    {
      name: 'bgColour',
      label: 'Hero Background Colour',
      type: 'select',
      options: [
        { label: 'Transparent', value: 'blank' },
        { label: 'Forest Green', value: 'forest' },
        { label: 'Turmeric Yellow', value: 'turmeric' },
        { label: 'Sky Blue', value: 'sky' },
        { label: 'Rose Pink', value: 'rose' },
        { label: 'Lavender', value: 'lavender' },
        { label: 'Fire Red', value: 'fire' },
      ],
      defaultValue: 'blank'
    },
    {
      name: 'buttons',
      labels: {
        singular: 'Hero Button',
        plural: 'Hero Buttons'
      },
      type: 'array',
      maxRows: 2,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        components: {
          RowLabel: {
            path: 'src/blocks/HeroBlock/HeroButtonRowLabel.tsx',
          }
        },
      }
    },
    {
      name: 'heroContact',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'email',
          type: 'email',
        }
      ],
    },
  ],
}