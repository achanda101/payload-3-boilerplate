'use client'

import { useEffect, useRef, useState } from 'react'

interface FlourishRendererProps {
  visualisationId: string
  visualisationType?: string
  caption?: string
  height?: string
  isPrevHeading?: boolean
  isPrevUpload?: boolean
  isPrevVideo?: boolean
  isPrevBlockquote?: boolean
  isPrevSpotify?: boolean
  isPrevSoundcloud?: boolean
  isPrevFlourishEmbed?: boolean
}

export default function FlourishRenderer({
  visualisationId,
  visualisationType = 'flourish-chart',
  caption,
  height,
  isPrevHeading = false,
  isPrevUpload = false,
  isPrevVideo = false,
  isPrevBlockquote = false,
  isPrevSpotify = false,
  isPrevSoundcloud = false,
  isPrevFlourishEmbed = false,
}: FlourishRendererProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const embedRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Load the Flourish embed only once the chart is in view
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setIsVisible(true)

        const embed = embedRef.current
        if (!embed) return

        const existingScript = document.querySelector(
          'script[src="https://public.flourish.studio/resources/embed.js"]',
        )

        if (existingScript) {
          const w = window as typeof window & { Flourish?: { loadEmbeds: () => void } }
          if (w.Flourish) w.Flourish.loadEmbeds()
        } else {
          const script = document.createElement('script')
          script.src = 'https://public.flourish.studio/resources/embed.js'
          script.async = true
          embed.appendChild(script)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [visualisationId])

  if (!visualisationId) return null

  const topMargin =
    isPrevHeading ||
    isPrevUpload ||
    isPrevVideo ||
    isPrevBlockquote ||
    isPrevSpotify ||
    isPrevSoundcloud ||
    isPrevFlourishEmbed
      ? 'mt-0'
      : 'mt-[1rem] md:mt-[2rem]'

  return (
    <div
      ref={wrapperRef}
      className={`col-span-full md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 ${topMargin} mb-[1rem] md:mb-[2rem] last:mb-0 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <figure className="flourish-figure">
        <div
          ref={embedRef}
          className={`flourish-embed ${visualisationType}`}
          data-src={`visualisation/${visualisationId}`}
          style={height ? { height } : undefined}
        >
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://public.flourish.studio/visualisation/${visualisationId}/thumbnail`}
              width="100%"
              alt="chart visualization"
            />
          </noscript>
        </div>
        {caption && (
          <figcaption className="mt-2 text-sm text-center text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}
