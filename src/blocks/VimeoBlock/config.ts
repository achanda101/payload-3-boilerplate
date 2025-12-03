import { Block } from 'payload'

const vimeoURLRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com|player\.vimeo\.com)\/.+$/i

const validateVimeoURL = (value: string) => {
  if (!value) {
    return true // Let required field handle empty values
  }

  if (!vimeoURLRegex.test(value)) {
    return 'Please enter a valid Vimeo URL'
  }

  return true
}

export const VimeoBlock: Block = {
  slug: 'vimeoBlock',
  interfaceName: 'VimeoBlock',
  labels: {
    singular: 'Vimeo Block',
    plural: 'Vimeo Blocks',
  },
  fields: [
    {
      name: 'videoURL',
      label: 'Vimeo Video URL',
      type: 'text',
      required: true,
      validate: validateVimeoURL,
    },
    {
      name: 'title',
      label: 'Title (optional)',
      type: 'text',
      localized: true,
    },
    {
      name: 'desc',
      type: 'text',
      localized: true,
      label: 'Description (optional)',
    },
  ],
}
