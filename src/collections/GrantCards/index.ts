import type { CollectionConfig } from "payload";
import { link } from "@/fields/link";

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canUpdateUser } from '@/access/canUpdateUser'

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
              label: 'Card Display',
              fields: [
                {
                  name: 'showHome',
                  label: 'Display Grant Card on Homepage',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'order',
                  label: 'Order of Display',
                  type: 'number',
                  min: 1,
                }
              ],
              admin: {
                style: {
                  backgroundColor: '#f1f6fa',
                  paddingBlock: '8px',
                  paddingBottom: '20px',
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
                      label: 'Closed',
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
                },
                {
                  name: 'mascot',
                  type: 'upload',
                  relationTo: 'mediaCloud',
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
          type: 'group',
          label: 'Badge Details',
          fields: [
            {
              name: 'badgeText',
              type: 'text',
              localized: true,
              admin: {
                description: 'Badge Text (e.g., "Rapid Response Fund") or the date of availability (e.g., "Applications open until 15th June")',
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
            width: '50%',
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
          label: 'Grant Details (eg: Availability, Amount, Timeframe)',
          fields: [
            {
              name: 'grantSpecs',
              label: '',
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
              maxLength: 200,
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
      autosave: {
        interval: 2000, // Changed from 100ms to 2000ms to prevent flickering
      },
    },
    maxPerDoc: 50,
  },
}

