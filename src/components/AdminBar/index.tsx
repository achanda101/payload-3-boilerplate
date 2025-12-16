'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/utilities/cn'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw } from 'lucide-react'

import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  // const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()

  const onAuthChange = React.useCallback((user) => {
    setShow(user?.id)
  }, [])

  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white sticky top-0 z-50', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container flex items-center justify-between">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white flex-1"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          // collection={collection}
          // collectionLabels={{
          //   plural: collectionLabels[collection]?.plural || 'Pages',
          //   singular: collectionLabels[collection]?.singular || 'Page',
          // }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
        {adminBarProps?.preview && (
          <button
            onClick={handleRefresh}
            className="ml-4 p-2 hover:bg-gray-800 rounded transition-colors"
            title="Refresh preview"
            aria-label="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
