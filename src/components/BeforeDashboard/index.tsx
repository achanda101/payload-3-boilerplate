import { Banner } from '@payloadcms/ui/elements/Banner'
import Link from 'next/link'
import React from 'react'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard!</h4>
        <br />
        <p>
          <Link href="/">View Homepage</Link> <em>(Staging Site)</em>
        </p>
      </Banner>
      
    </div>
  )
}

export default BeforeDashboard
