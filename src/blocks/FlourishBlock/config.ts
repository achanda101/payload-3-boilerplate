import type { Block } from 'payload'

export const FlourishBlock: Block = {
  slug: 'flourish-embed',
  interfaceName: 'FlourishEmbed',
  labels: {
    singular: 'Flourish Visualisation',
    plural: 'Flourish Visualisations',
  },
  fields: [
    {
      name: 'visualisationId',
      label: 'Flourish Visualisation ID',
      type: 'text',
      required: true,
      admin: {
        placeholder: '28711202',
        description:
          'The numeric ID from your Flourish embed code — e.g. data-src="visualisation/28711202"',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        if (!/^\d+$/.test(value)) {
          return 'Please enter only the numeric ID (e.g. 28711202), not the full URL'
        }
        return true
      },
    },
    {
      name: 'visualisationType',
      label: 'Visualisation Type (CSS class)',
      type: 'text',
      defaultValue: 'flourish-chart',
      admin: {
        description:
          'The CSS class from the embed code, e.g. flourish-chart, flourish-map, flourish-survey. Defaults to flourish-chart.',
      },
    },
    {
      name: 'caption',
      label: 'Caption (Optional)',
      type: 'textarea',
      localized: true,
      admin: {
        rows: 2,
        description: 'Optional caption displayed below the visualisation',
      },
    },
    {
      name: 'height',
      label: 'Height Override (Optional)',
      type: 'text',
      admin: {
        placeholder: '600px',
        description: 'Optional fixed height. Leave blank to use Flourish responsive default.',
      },
    },
    {
      name: 'blockAnchorId',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/BlockIdDisplay#BlockIdDisplay',
        },
      },
    },
  ],
}
