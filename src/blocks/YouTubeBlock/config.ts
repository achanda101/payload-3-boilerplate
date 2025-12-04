import { Block } from 'payload'

const youtubeURLRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]{11}(\?.*)?$/i

const validateYoutubeURL = (value: string) => {
  if (!value) {
    return true // Let required field handle empty values
  }

  if (!youtubeURLRegex.test(value)) {
    return 'Please enter a valid YouTube URL'
  }

  return true
}

export const YouTubeBlock: Block = {
  slug: 'youtubeBlock',
  interfaceName: 'YouTubeBlock',
  labels: {
    singular: 'YouTube Block',
    plural: 'YouTube Blocks',
  },
  fields: [
    {
      name: 'videoURL',
      label: 'YouTube Video URL',
      type: 'text',
      required: true,
      validate: validateYoutubeURL,
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
