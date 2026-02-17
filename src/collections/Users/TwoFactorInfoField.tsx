'use client'

import React from 'react'

const TwoFactorInfoField: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '6px',
        padding: '16px',
        marginBottom: '20px',
      }}
    >
      <h3
        style={{
          margin: '0 0 12px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#0c4a6e',
        }}
      >
        Time-Based Two-Factor Authentication (2FA)
      </h3>
      <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#334155' }}>
        <p style={{ margin: '0 0 12px 0' }}>
          To activate time-based two-factor authentication for your account, you&apos;ll need an
          authenticator app installed on your mobile device.
        </p>
        <p style={{ margin: '0 0 12px 0' }}>
          <strong>Recommended authenticator app: </strong>
          <a
            href="https://proton.me/authenticator"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#dc2626', textDecoration: 'underline' }}
          >
            Proton Authenticator
          </a>
        </p>
        <p style={{ margin: '0' }}>
          Once you have an authenticator app installed, you can set up 2FA through your account
          security settings. The app will generate time-based codes that you&apos;ll use along with
          your password to log in.
        </p>
      </div>
    </div>
  )
}

export default TwoFactorInfoField
