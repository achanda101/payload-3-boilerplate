import type { Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Primary',
    value: 'primary',
  },
  outline: {
    label: 'Secondary',
    value: 'secondary',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
              {
                label: 'Email',
                value: 'email',
              },
              {
                label: 'Document Link',
                value: 'document',
              },
              {
                label: 'Eligibility Test',
                value: 'etest',
              },
            ],
          },
          {
            type: 'group',
            fields: [
              {
                name: 'newTab',
                type: 'checkbox',
                admin: {
                  style: {
                    alignSelf: 'flex-end',
                  },
                  width: '20%',
                },
                label: 'Open in new tab',
              },
              {
                name: 'downloadLink',
                type: 'checkbox',
                admin: {
                  style: {
                    alignSelf: 'flex-end',
                  },
                  width: '20%',
                },
                label: 'Download icon',
              },
              {
                name: 'arrowLink',
                type: 'checkbox',
                admin: {
                  style: {
                    alignSelf: 'flex-end',
                  },
                  width: '20%',
                },
                label: 'Arrow icon',
              },
              {
                name: 'pillSolid',
                type: 'checkbox',
                admin: {
                  style: {
                    alignSelf: 'flex-end',
                  },
                  width: '20%',
                },
                label: 'Pill Button (Solid)',
              },
              {
                name: 'pillOutline',
                type: 'checkbox',
                admin: {
                  style: {
                    alignSelf: 'flex-end',
                  },
                  width: '20%',
                },
                label: 'Pill Button (Outline)',
              },
            ],
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Page to link to',
      maxDepth: 2,
      relationTo: ['grants', 'pages', 'blog', 'reports', 'mmedia'],
      required: true,
      validate: (value: unknown, { siblingData }: any) => {
        // Only validate if this link type is selected
        if (siblingData?.type === 'reference') {
          if (!value) {
            return 'Please select a page to link to'
          }
        }
        return true
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      validate: (val) => {
        if (!val) return 'External URL is required'
        const isValidUrl = /^https?:\/\/.+/.test(val)
        if (!isValidUrl) {
          return 'Please enter a valid URL starting with http:// or https://'
        }
        return true
      },
      label: 'Custom URL',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'email',
      },
      label: 'Provide email',
      required: true,
    },
    {
      name: 'doc',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'document',
      },
      label: 'Document to link to',
      maxDepth: 2,
      relationTo: ['documents'],
      required: true,
      validate: (value: unknown, { siblingData }: any) => {
        // Only validate if this link type is selected
        if (siblingData?.type === 'document') {
          if (!value) {
            return 'Please select a document to link to'
          }
        }
        return true
      },
    },
    {
      name: 'etestlink',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'etest',
      },
      label: 'Eligibility Test to link to',
      maxDepth: 2,
      relationTo: ['etests'],
      required: true,
      validate: (value: unknown, { siblingData }: any) => {
        // Only validate if this link type is selected
        if (siblingData?.type === 'etest') {
          if (!value) {
            return 'Please select an eligibility test to link to'
          }
        }
        return true
      },
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
          },
          label: 'Label',
          // required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
