import { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  BoldFeature,
  UnderlineFeature,
  ItalicFeature,
  LinkFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";

export const FeatureCardAccordion: Block = {
  slug: "featCrdAcc",
  labels: {
    singular: "Feature Card Accordion",
    plural: "Feature Card Accordions",
  },
  imageURL: "/block_icons/feature-card-accordion-block-icon.png",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      admin: {
        description: "Title for the block",
      },
    },
    {
      name: "featCrds",
      label: "Feature Card Accordion Items",
      labels: {
        singular: "Feature Card Accordion Item",
        plural: "Feature Card Accordion Items",
      },
      type: "array",
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Accordion (Left Column)',
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "accTitle",
                      label: "Accordion Item Title",
                      type: "text",
                      localized: true,
                      admin: {
                        width: "30%",
                      },
                    },
                    {
                      name: "accContent",
                      label: "Accordion Item Content",
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
                        width: "70%",
                      },
                    },
                  ]
                },
              ],
            },
            {
              label: 'Feature Card (Right Column)',
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "crdTag",
                      label: "Feature Card Tag",
                      type: "text",
                      localized: true,
                      maxLength: 20,
                      admin: {
                        width: "30%",
                        components: {
                          afterInput: [
                            {
                              path: '@/utilities/characterCounter.tsx'
                            }
                          ]
                        }
                      },
                    },
                    {
                      name: "crdContent",
                      label: "Feature Card Content",
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
                        width: "70%",
                      },
                    },
                  ]
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "mascot",
                      type: "upload",
                      relationTo: "assetCloud",
                      admin: {
                        description: "Upload a mascot image for the feature card",
                        width: "60%",
                      },
                    },
                    {
                      name: 'crdColour',
                      label: 'Feature Card Colour',
                      type: 'select',
                      options: [
                        { label: 'Forest Green', value: 'forest' },
                        { label: 'Turmeric Yellow', value: 'turmeric' },
                        { label: 'Sky Blue', value: 'sky' },
                        { label: 'Rose Pink', value: 'rose' },
                        { label: 'Lavender', value: 'lavender' },
                        { label: 'Fire Red', value: 'fire' },
                      ],
                      defaultValue: 'forest',
                      admin: { 
                        description: 'Select a colour for the Feature Card background.',
                        width: "40%",
                      }
                    },
                  ]
                }
              ],
            },
          ],
        },
      ],
      admin: {
        components: {
          RowLabel: {
            path: 'src/blocks/FeatureCardAccordion/FeatCardAccRowLabel.tsx',
          }
        },
      },
    }
  ],
}