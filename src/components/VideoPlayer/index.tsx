import React from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  videoURL: string
  title?: string
  desc?: string
  isPrevHeading?: boolean
  isPrevUpload?: boolean
  isPrevVideo?: boolean
  isPrevBlockquote?: boolean
  isPrevSpotify?: boolean
  isPrevSoundcloud?: boolean
  isNextVideo?: boolean
}

function VideoPlayer({
  videoURL,
  title,
  desc,
  isPrevHeading = false,
  isPrevUpload = false,
  isPrevVideo = false,
  isPrevBlockquote = false,
  isPrevSpotify = false,
  isPrevSoundcloud = false,
}: VideoPlayerProps) {
  if (!videoURL) {
    return null
  }

  const topMargin =
    isPrevHeading || isPrevUpload || isPrevVideo || isPrevBlockquote || isPrevSpotify || isPrevSoundcloud
      ? 'mt-0'
      : 'mt-[4rem]'

  return (
    <div
      className={`col-span-full md:col-span-8 md:col-start-1 lg:col-span-10 lg:col-start-2 ${topMargin} mb-[4rem] last:mb-0`}
    >
      <div className="relative" style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}>
        <ReactPlayer
          src={videoURL}
          style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
          light
          controls
          playing={false}
        />
        {title && (
          <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-75 px-4 py-2">
            <p className="font-semibold text-white">{title}</p>
          </div>
        )}
      </div>
      {desc && <p className="small mt-3 md:w-2/3">{desc}</p>}
    </div>
  )
}

export default VideoPlayer
