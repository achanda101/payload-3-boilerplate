import type { CollectionConfig } from "payload";
import { link } from "@/fields/link";

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { getServerSideURL } from '@/utilities/getURL'

export const GrantCards: CollectionConfig<'grantcards'> = {
  slug: 'grantcards',
  labels: {
    singular: 'Grant Card',
    plural: 'Grant Cards'
  },
  access: {
    create: authenticated,
    //TODO: GrantCard - Fix RBAC for delete
    delete: authenticated,
    read: authenticatedOrPublished,
    //TODO: GrantCard - Fix RBAC - writer should be able to update only their records
    update: authenticated,
  },
  admin: {
    group: 'Content',
    defaultColumns: [ 'title', 'cardColour', 'order', 'activePeriod', 'mascot', '_status' ],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'grantcards',
        })

        return `${getServerSideURL()}${path}`
      },
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'group',
          fields: [
            {
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'Title of Grant Card',
                  type: 'text',
                  localized: true,
                  unique: true,
                  required: true,
                },
                {
                  name: 'desc',
                  label: 'Description of Grant Card',
                  type: 'textarea',
                  localized: true,
                  maxLength: 300,
                  admin: {
                    components: {
                      afterInput: [
                        {
                          path: '@/utilities/characterCounter.tsx'
                        }
                      ]
                    }
                  }
                },
              ],
              admin: {
                style: {
                  backgroundColor: '#f1f6fa',
                  paddingBlock: '8px',
                  paddingInline: '10px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  marginBottom: '5px'
                }
              }
            },
            {
              type: 'group',
              label: 'Badge Details',
              fields: [
                {
                  name: 'badgeText',
                  type: 'text',
                  localized: true,
                  maxLength: 50,
                  admin: {
                    placeholder: 'E.g., Applications open until 15th June',
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
                  name: 'badgeType',
                  type: 'select',
                  options: [
                    { label: 'Information (orange)', value: 'info' },
                    { label: 'Important (red)', value: 'imp' },
                    { label: 'Inactive (grey)', value: 'inactive' }
                  ],
                  defaultValue: 'info',
                },
              ],
              admin: {
                style: {
                  backgroundColor: '#f1f6fa',
                  paddingBlock: '8px',
                  paddingInline: '10px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  marginBottom: '5px'
                }
              }
            },
          ],
          admin: {
            width: '50%'
          }
        },
        {
          type: 'group',
          fields: [
            {
              type: 'group',
              fields: [
                {
                  name: 'activePeriod',
                  label: 'Active Period of Grant',
                  type: 'radio',
                  index: true,
                  options: [
                    {
                      label: 'Open all year',
                      value: 'open_all_year'
                    },
                    {
                      label: 'Specify period',
                      value: 'specific_period'
                    },
                    {
                      label: 'Closed (Card will not be displayed)',
                      value: 'closed'
                    },
                  ],
                  defaultValue: 'open_all_year',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'startDate',
                      type: 'date',
                    },
                    {
                      name: 'endDate',
                      type: 'date',
                    }
                  ],
                  admin: {
                    condition: (siblingData) => siblingData?.activePeriod === 'specific_period' || false,
                  }
                }
              ],
              admin: { 
                style: {
                  paddingBlock: '8px',
                  paddingInline: '10px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  marginBottom: '5px'
                }
              }
            },
            {
              type: 'group',
              label: 'Card Features',
              fields: [
                {
                  name: 'cardColour',
                  type: 'select',
                  options: [
                    { label: 'Forest Green', value: 'forest' },
                    { label: 'Turmeric Yellow', value: 'turmeric' },
                    { label: 'Sky Blue', value: 'sky' },
                    { label: 'Rose Pink', value: 'rose' },
                    { label: 'Lavender', value: 'lavender' },
                    { label: 'Fire Red', value: 'fire' },
                    { label: 'Transparent', value: 'trans'}
                  ],
                  defaultValue: 'forest',
                  admin: { 
                    description: 'Select a colour for the Grant Card background. Choose "Transparent" if it is a Special Grant.',
                  }
                },
                {
                  name: 'mascot',
                  type: 'upload',
                  relationTo: 'assetCloud',
                  admin: {
                    description: 'Upload a mascot image for the Grant Card',
                  },
                },
              ],
              admin: { 
                style: {
                  paddingBlock: '8px',
                  paddingInline: '10px',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  marginBottom: '5px'
                }
              }
            }
          ],
          admin: {
            width: '50%'
          }
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'grantSpecs',
          label: 'Grant Details (eg: Availability, Amount, Timeframe)',
          labels: {
            singular: 'Grant Specification',
            plural: 'Grant Specifications'
          },
          type: 'array',
          maxRows: 3,
          fields: [
            {
              name: 'spec',
              label: 'Specification',
              type: 'text',
              localized: true,
              maxLength: 20,
              admin: {
                components: {
                  afterInput: [
                    {
                      path: '@/utilities/characterCounter.tsx'
                    }
                  ]
                }
              }
            }
          ],
          admin: {
            width: '50%',
            components: {
              RowLabel: {
                path: 'src/collections/GrantCards/GrantCardSpecRowLabel.tsx',
              }
            },
          }
        },
        {
          name: 'grantUses',
          label: 'Common Uses',
          type: 'textarea',
          localized: true,
          maxLength: 300,
          admin: {
            width: '30%',
            components: {
              afterInput: [
                {
                  path: '@/utilities/characterCounter.tsx'
                }
              ]
            }
          }
        }
      ],
      admin: {
        style: {
          paddingBlock: '8px',
          paddingInline: '10px',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          marginBottom: '5px'
        }
      }
    },
    {
      name: 'cardButtons',
      labels: {
        singular: 'Card Button',
        plural: 'Card Buttons'
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
            path: 'src/collections/GrantCards/GrantCardButtonRowLabel.tsx',
          }
        },
      }
    },
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 50,
  },
}

