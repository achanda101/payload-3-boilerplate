import { Block } from 'payload'

export const FundingMap: Block = {
  slug: 'fundingMap',
  labels: {
    singular: 'Funding Map',
    plural: 'Funding Maps',
  },
  imageURL: '/block_icons/funding-map-block-icon.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'selectorLabel',
      type: 'text',
      localized: true,
      admin: {
        description: 'Label for the region selector dropdown',
      },
    },
    {
      name: 'items',
      label: 'Regions',
      labels: {
        singular: 'Funding Region',
        plural: 'Funding Regions',
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'regionName',
          label: 'Region Name',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Asia & Pacific',
              value: 'uaf-asia-pacific',
            },
            {
              label: 'Afghanistan',
              value: 'afghan',
            },
            {
              label: 'Australia',
              value: 'aus',
            },
            {
              label: 'Bangladesh',
              value: 'bangla',
            },
            {
              label: 'Cambodia',
              value: 'cambodia',
            },
            {
              label: 'China',
              value: 'china',
            },
            {
              label: 'India',
              value: 'india',
            },
            {
              label: 'Indonesia',
              value: 'indonesia',
            },
            {
              label: 'Korea',
              value: 'korea',
            },
            {
              label: 'Laos',
              value: 'laos',
            },
            {
              label: 'Malaysia',
              value: 'malaysia',
            },
            {
              label: 'Mongolia',
              value: 'mongolia',
            },
            {
              label: 'Myanmar',
              value: 'myanmar',
            },
            {
              label: 'Nepal',
              value: 'nepal',
            },
            {
              label: 'Pakistan',
              value: 'pak',
            },
            {
              label: 'Papua New Guinea',
              value: 'papua',
            },
            {
              label: 'Philippines',
              value: 'philippines',
            },
            {
              label: 'Sri Lanka',
              value: 'srilanka',
            },
            {
              label: 'Thailand',
              value: 'thailand',
            },
            {
              label: 'Vietnam',
              value: 'vietnam',
            },
          ],
          defaultValue: 'uaf-asia-pacific',
        },
        {
          name: 'subitems',
          label: 'Statistics',
          labels: {
            singular: 'Stat Item',
            plural: 'Stat Items',
          },
          type: 'array',
          minRows: 1,
          maxRows: 3,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'statnumber',
                  label: 'Stat Number',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'Statistical number or value',
                    width: '50%',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'Description for this statistic',
                    width: '50%',
                  },
                },
              ],
            },
          ],
          admin: {
            description: 'Maximum of 3 statistical items for this region',
            components: {
              RowLabel: {
                path: 'src/blocks/FundingMap/subitemLabel.tsx',
              },
            },
          },
        },
      ],
      admin: {
        description: 'Funding regions with their statistics',
        components: {
          RowLabel: {
            path: 'src/blocks/FundingMap/itemLabel.tsx',
          },
        },
      },
    },
  ],
}
