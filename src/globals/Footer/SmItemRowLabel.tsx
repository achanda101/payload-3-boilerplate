'use client'
import { useRowLabel } from '@payloadcms/ui'

const SmItemRowLabel = () => {
  const smFullName = {
    fb: "Facebook",
    insta: "Instagram",
    threads: "Threads",
    mast: "Mastodon",
    wa: "WhatsApp",
    linkedin: "LinkedIn",
    scloud: "SoundCloud",
    med: "Medium",
    sstack: "Substack"
  }

  const { data, rowNumber } = useRowLabel<{ smType?: string }>()

  const customLabel = data?.smType && data.smType in smFullName 
    ? smFullName[data.smType as keyof typeof smFullName]
    : `Social Media ${String(rowNumber).padStart(2, '0')}`
  
  return <div>{customLabel}</div>
}

export default SmItemRowLabel;