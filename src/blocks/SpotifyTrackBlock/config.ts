import type { Block } from 'payload'

export const SpotifyTrackBlock: Block = {
  slug: 'spotifyTrack',
  labels: {
    singular: 'Spotify Track',
    plural: 'Spotify Tracks',
  },
  fields: [
    {
      name: 'trackUrl',
      type: 'text',
      label: 'Spotify Track URL',
      required: true,
      admin: {
        placeholder: 'https://open.spotify.com/track/...',
        description:
          'Paste the full Spotify track URL (e.g., https://open.spotify.com/track/TRACK_ID)',
      },
      validate: (value) => {
        // Validate Spotify URL format
        const spotifyUrlRegex = /^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+(\?.*)?$/
        if (!spotifyUrlRegex.test(value)) {
          return 'Please provide a valid Spotify track URL'
        }
        return true
      },
    },
    {
      name: 'displayMode',
      type: 'radio',
      label: 'Display Mode',
      defaultValue: 'compact',
      options: [
        {
          label: 'Compact (Small player)',
          value: 'compact',
        },
        {
          label: 'Full (Large player)',
          value: 'full',
        },
      ],
      admin: {
        hidden: true,
        description: 'Choose how to display the Spotify track',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption (Optional)',
      localized: true,
      admin: {
        rows: 3,
        description: 'Add context or description for this track',
      },
    },
    {
      name: 'displayMetadata',
      type: 'checkbox',
      label: 'Show Track Metadata',
      defaultValue: true,
      admin: {
        hidden: true,
        description: 'Display artist name and duration below the player',
      },
    },
  ],
}
