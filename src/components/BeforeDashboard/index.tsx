import { Banner } from '@payloadcms/ui/elements/Banner'
import Link from 'next/link'
import React from 'react'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <p>
          <Link href="/">View Homepage</Link>
        </p>
      </Banner>
      <Banner className={`${baseClass}__banner`} type="info">
        <h4>Video Tutorials</h4>
        <small>Turn on captions for better guidance.</small>
          <div>
            <p>
              <Link href="https://www.youtube.com/watch?v=aDb8VjdZkvw" target='blank'>
                How to create a Page
              </Link>
            </p>
          </div>
        </Banner>
    </div>
  )
}

export default BeforeDashboard
