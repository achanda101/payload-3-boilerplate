import type { Block } from 'payload'

export const SoundCloudEmbedBlock: Block = {
  slug: 'soundcloud-embed',
  interfaceName: 'SoundCloud Embed',
  labels: {
    singular: 'SoundCloud Embed Block',
    plural: 'SoundCloud Embed Blocks',
  },
  fields: [
    {
      name: 'trackUrl',
      label: 'SoundCloud Track or Playlist URL',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'https://soundcloud.com/artist/track-name',
        description: 'Paste the FULL URL to the SoundCloud track or playlist',
      },
      validate: (value) => {
        if (!value) return true

        const validPatterns = [
          /^https?:\/\/(www\.)?soundcloud\.com\/[\w\-]+\/[\w\-]+(\?.*)?$/,
          /^https?:\/\/(www\.)?soundcloud\.com\/[\w\-]+\/sets\/[\w\-]+(\?.*)?$/,
        ]

        const isValid = validPatterns.some((pattern) => pattern.test(value))

        if (!isValid) {
          return 'Please enter a valid SoundCloud track or playlist URL'
        }

        return true
      },
    },
    {
      name: 'trackTitle',
      label: 'Custom Track Title (Optional)',
      type: 'text',
      localized: true,
      admin: {
        placeholder: 'Leave blank to use SoundCloud track title',
        description: 'Override the default SoundCloud track title for display purposes',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption (Optional)',
      localized: true,
      admin: {
        rows: 3,
        description: 'Add context or description for this track or album',
      },
    },
  ],
}
