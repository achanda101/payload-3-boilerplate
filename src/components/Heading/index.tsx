import React, { ReactNode, HTMLAttributes } from 'react'
import { formatCurrencySymbols } from '@/utilities/formatCurrencySymbols'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel
  children: ReactNode
  formatCurrency?: boolean
}

/**
 * Reusable Heading component that automatically formats currency symbols
 * ($, ₹, €) as superscript in h1-h4 headings.
 *
 * @param level - Heading level (1-6)
 * @param children - Content to render
 * @param formatCurrency - Whether to format currency symbols (default: true for h1-h4)
 * @param ...props - Additional HTML attributes
 */
export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  formatCurrency,
  ...props
}) => {
  const Tag = `h${level}` as const
  const HeadingTag = Tag as keyof React.JSX.IntrinsicElements

  // Only format currency for h1-h4 by default
  const shouldFormat = formatCurrency ?? level <= 4

  const processChildren = (child: ReactNode): ReactNode => {
    if (typeof child === 'string' && shouldFormat) {
      return formatCurrencySymbols(child)
    }
    return child
  }

  return React.createElement(HeadingTag, props, processChildren(children))
}

export default Heading
