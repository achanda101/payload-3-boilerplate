import React from 'react'

interface SoundCloudRendererProps {
  trackUrl: string
  blockName?: string
  trackTitle?: string
  caption?: string
  isPrevHeading?: boolean
  isPrevUpload?: boolean
  isPrevVideo?: boolean
  isPrevBlockquote?: boolean
  isPrevSpotify?: boolean
  isPrevSoundcloud?: boolean
}

function SoundCloudRenderer({
  trackUrl,
  trackTitle,
  caption,
  isPrevHeading = false,
  isPrevUpload = false,
  isPrevVideo = false,
  isPrevBlockquote = false,
  isPrevSpotify = false,
  isPrevSoundcloud = false,
}: SoundCloudRendererProps) {
  if (!trackUrl) {
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

  // Construct the SoundCloud embed iframe URL
  // The trackUrl is the SoundCloud page URL, we need to URL encode it for the embed
  const encodedUrl = encodeURIComponent(trackUrl)
  const iframeUrl = `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`

  return (
    <div
      className={`col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMargin} mb-[2rem] md:mb-[4rem] last:mb-0`}
    >
      <div className="flex justify-center">
        <iframe
          width="100%"
          height="150"
          style={{ border: 'none', overflow: 'hidden' }}
          allow="autoplay"
          src={iframeUrl}
          title={trackTitle || 'SoundCloud Track'}
        />
      </div>
      {trackTitle && <p className="small mt-3">{trackTitle}</p>}
      {caption && <p className="small mt-3">{caption}</p>}
    </div>
  )
}

export default SoundCloudRenderer
