import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}`}>
          <Image src="/uafanp-logo.svg" alt="UAFANP Logo" height={50} width={200} />
        </Link>
      </div>
      <br />
      <p>
        <b>Welcome to your content management system!</b>
        {' This is where content editors will log in to manage the website. To test the CMS, the demo login credentials are:'}
      </p>
      <p>
        <strong>Email:</strong>demo@uafanp.org
        <br />
        <strong>Password:</strong>demoadmin123
      </p>
    </div>
  )
}

export default BeforeLogin
