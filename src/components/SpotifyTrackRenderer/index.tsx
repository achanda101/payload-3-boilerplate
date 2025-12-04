import React from 'react'

interface SpotifyTrackRendererProps {
  trackUrl: string
  blockName?: string
  caption?: string
  displayMode?: 'compact' | 'large'
  displayMetadata?: boolean
  isPrevHeading?: boolean
  isPrevUpload?: boolean
  isPrevVideo?: boolean
  isPrevBlockquote?: boolean
  isPrevSpotify?: boolean
  isPrevSoundcloud?: boolean
}

function SpotifyTrackRenderer({
  trackUrl,
  blockName,
  caption,
  displayMode = 'compact',
  displayMetadata = true,
  isPrevHeading = false,
  isPrevUpload = false,
  isPrevVideo = false,
  isPrevBlockquote = false,
  isPrevSpotify = false,
  isPrevSoundcloud = false,
}: SpotifyTrackRendererProps) {
  // Extract track ID from Spotify URL
  const getTrackId = (url: string): string | null => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/)
    return match ? match[1] : null
  }

  const trackId = getTrackId(trackUrl)

  if (!trackUrl || !trackId) {
    return null
  }

  const topMargin =
    isPrevHeading ||
    isPrevUpload ||
    isPrevVideo ||
    isPrevBlockquote ||
    isPrevSpotify ||
    isPrevSoundcloud
      ? 'mt-0'
      : 'mt-[2rem] md:mt-[4rem]'

  // Create Spotify embed iframe URL
  const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${trackId}`

  const iframeHeight = displayMode === 'large' ? '352' : '152'

  return (
    <div
      className={`col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMargin} mb-[2rem] md:mb-[4rem] last:mb-0`}
    >
      <div className="flex justify-center">
        <iframe
          src={spotifyEmbedUrl}
          width="100%"
          height={iframeHeight}
          style={{ border: 'none' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          title={blockName || 'Spotify Track'}
        />
      </div>
      {caption && displayMetadata && <p className="small mt-3 md:w-2/3">{caption}</p>}
    </div>
  )
}

export default SpotifyTrackRenderer
