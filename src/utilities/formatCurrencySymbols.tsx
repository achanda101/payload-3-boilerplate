import React, { ReactNode } from 'react'

/**
 * Wraps currency symbols ($, ₹, €) in <sup> tags for superscript display
 * Used primarily in headings (h1-h4)
 */
export function formatCurrencySymbols(text: string): ReactNode {
  if (!text || typeof text !== 'string') {
    return text
  }

  // Match currency symbols: $, ₹, €
  const currencyRegex = /([$₹€])/g

  const parts = text.split(currencyRegex)

  if (parts.length === 1) {
    // No currency symbols found
    return text
  }

  return parts.map((part, index) => {
    if (currencyRegex.test(part)) {
      // Reset regex lastIndex since we're reusing it
      currencyRegex.lastIndex = 0
      return (
        <span
          key={index}
          className="currency-symbol"
          style={{
            fontSize: '0.6em',
            verticalAlign: 'top',
            lineHeight: 1,
            position: 'relative',
            top: '0.125em',
          }}
        >
          {part}
        </span>
      )
    }
    return part
  })
}
