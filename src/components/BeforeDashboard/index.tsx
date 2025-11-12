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
        <div className='flex gap-1 backdrop-brightness-50'>
          <h3>Video Tutorials</h3>
          <div className='flex flex-col gap-1'>
            <p>
              <Link href="https://www.youtube.com/watch?v=aDb8VjdZkvw" target='blank'>
                How to create a Page
              </Link>
            </p>
            <p>
              <Link href="#" target='blank'>
                How to create a Grant Page
              </Link>
            </p>
          </div>
        </div>
      </Banner>
      
    </div>
  )
}

export default BeforeDashboard
