import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
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
