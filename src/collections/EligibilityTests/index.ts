import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  BoldFeature,
  UnderlineFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { slugField } from '@/fields/slug'

import { revalidateTest } from './hooks/revalidateTest'

export const EligibilityTests: CollectionConfig<'etests'> = {
  slug: 'etests',
  labels: {
    singular: 'Eligibility Test',
    plural: 'Eligibility Tests',
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: {
      name: 'Content',
      order: '4',
    },
    defaultColumns: ['testName', '_status'],
    useAsTitle: 'testName',
  },
  trash: true,
  fields: [
    {
      name: 'testName',
      type: 'text',
      localized: true,
      required: true,
      unique: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'introCard',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'introTitle',
                  type: 'text',
                  label: 'Title of Intro Card',
                  localized: true,
                  required: true,
                  admin: {
                    width: '40%',
                  },
                },
                {
                  name: 'introDesc',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: [
                      BoldFeature(),
                      UnderlineFeature(),
                      ItalicFeature(),
                      OrderedListFeature(),
                      UnorderedListFeature(),
                      LinkFeature({
                        enabledCollections: ['grants', 'pages', 'reports', 'blog'],
                      }),
                      InlineToolbarFeature(),
                    ],
                    admin: {
                      placeholder: 'Start typing your content here ...',
                    },
                  }),
                  label: 'Description',
                  localized: true,
                  admin: {
                    width: '60%',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'critList',
          label: 'Criteria List',
          fields: [
            {
              name: 'criteria',
              type: 'array',
              label: 'Criteria',
              labels: {
                singular: 'Criterion',
                plural: 'Criteria',
              },
              minRows: 1,
              admin: {
                components: {
                  RowLabel: 'src/collections/EligibilityTests/CriteriaRowLabel.tsx',
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'question',
                      type: 'text',
                      localized: true,
                      required: true,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'reason',
                      type: 'textarea',
                      localized: true,
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  type: 'array',
                  name: 'options',
                  labels: {
                    singular: 'Option',
                    plural: 'Options',
                  },
                  minRows: 2,
                  admin: {
                    components: {
                      RowLabel: 'src/collections/EligibilityTests/OptionsRowLabel.tsx',
                    },
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'optionText',
                          type: 'text',
                          label: 'Option Text',
                          localized: true,
                          required: true,
                          admin: {
                            width: '60%',
                          },
                        },
                        {
                          type: 'group',
                          fields: [
                            {
                              name: 'isEligible',
                              label: 'Is the option eligible?',
                              type: 'checkbox',
                              defaultValue: false,
                            },
                            {
                              name: 'isCustom',
                              label:
                                'Show custom response (Note: the test will end here if selected)',
                              type: 'checkbox',
                              defaultValue: false,
                            },
                          ],
                          admin: {
                            width: '40%',
                          },
                        },
                      ],
                    },
                    {
                      name: 'customResponse',
                      type: 'richText',
                      editor: lexicalEditor({
                        features: [
                          BoldFeature(),
                          UnderlineFeature(),
                          ItalicFeature(),
                          OrderedListFeature(),
                          UnorderedListFeature(),
                          LinkFeature({
                            enabledCollections: ['grants', 'pages', 'reports', 'blog'],
                          }),
                          InlineToolbarFeature(),
                        ],
                        admin: {
                          placeholder: 'Start typing your custom response here ...',
                        },
                      }),
                      localized: true,
                      admin: {
                        condition: (data, siblingData) => {
                          return siblingData?.isCustom === true
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'isECard',
          label: 'Is Eligible Card',
          fields: [
            {
              name: 'isETitle',
              type: 'text',
              label: 'Title for Eligible Card',
              localized: true,
              required: true,
            },
            {
              name: 'isEDesc',
              label: 'Description for Eligible Card',
              type: 'richText',
              editor: lexicalEditor({
                features: [
                  BoldFeature(),
                  UnderlineFeature(),
                  ItalicFeature(),
                  OrderedListFeature(),
                  UnorderedListFeature(),
                  LinkFeature({
                    enabledCollections: ['grants', 'pages', 'reports', 'blog'],
                  }),
                  InlineToolbarFeature(),
                ],
                admin: {
                  placeholder: 'Start typing your content here ...',
                },
              }),
              localized: true,
            },
            {
              type: 'group',
              name: 'isELink',
              label: 'Link for Eligible Card',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'isEMascot',
              label: 'Mascot for Eligible Card',
              type: 'upload',
              relationTo: 'assetCloud',
            },
          ],
        },
        {
          name: 'notECard',
          label: 'Not Eligible Card',
          fields: [
            {
              name: 'notETitle',
              type: 'text',
              label: 'Title for the Not Eligible Card',
              localized: true,
              required: true,
            },
            {
              name: 'notEDesc',
              label: 'Description for the Not Eligible Card',
              type: 'richText',
              editor: lexicalEditor({
                features: [
                  BoldFeature(),
                  UnderlineFeature(),
                  ItalicFeature(),
                  OrderedListFeature(),
                  UnorderedListFeature(),
                  LinkFeature({
                    enabledCollections: ['grants', 'pages', 'reports', 'blog'],
                  }),
                  InlineToolbarFeature(),
                ],
                admin: {
                  placeholder: 'Start typing your content here ...',
                },
              }),
              localized: true,
            },
            {
              type: 'group',
              name: 'notELink',
              label: 'Link for the Not Eligible Card',
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
            {
              name: 'notEMascot',
              label: 'Mascot for the Not Eligible Card',
              type: 'upload',
              relationTo: 'assetCloud',
            },
          ],
        },
      ],
    },
    ...slugField('testName'),
  ],
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateTest],
  },
}
