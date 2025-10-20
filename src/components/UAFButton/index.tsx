import React, { useState } from "react";
import Link from "next/link";

interface ButtonProps {
  button: {
    type: string;
    newTab?: boolean | null;
    downloadLink?: boolean | null;
    arrowLink?: boolean | null;
    pillSolid?: boolean | null;
    pillOutline?: boolean | null;
    url?: string | null;
    label: string | null;
    email?: string | null;
    doc?: {
      relationTo: string;
      value: {
        url?: string;
      }
    } | null;
    reference?: {
      relationTo?: string;
      value: {
        slug?: string;
      };
    }
  };
}

export const UAFButton: React.FC<ButtonProps> = ({ button }) => {
  const getHref = () => {
    if (button.type === 'reference') {
      return `/${button.reference?.relationTo}/${button.reference?.value?.slug}` || '#'
    } else if (button.type === 'email') {
      return `mailto:${button.email}` || '#'
    } else if (button.type === 'document') {
      return `${button.doc?.value?.url}` || '#'
    } else {
      return button.url || '#'
    }
  }

  const getBtnClassName = () => {
    const classes: string[] = []

    // Handle download link variants
    if (button.downloadLink) {
      classes.push('download')
      if (button.pillSolid) {
        classes.push('pill-button', 'dark')
      } else if (button.pillOutline) {
        classes.push('pill-button', 'outline')
      }
    }

    // Handle arrow link variants
    else if (button.arrowLink) {
      classes.push('arrow')
      if (button.pillSolid) {
        classes.push('pill-button', 'dark')
      } else if (button.pillOutline) {
        classes.push('pill-button', 'outline')
      }
    }

    // Handle pill buttons without download or arrow link
    else if (button.pillSolid) {
      classes.push('pill-button', 'dark')
    }
    else if (button.pillOutline) {
      classes.push('pill-button', 'outline')
    }

    // Default to underline if no specific variant is set
    else {
      classes.push('underline')
    }

    return classes.join(' ')
  }

  return (
      <Link
        href={getHref()}
        target={button?.newTab ? '_blank' : '_self'}
      >
        <button className={getBtnClassName()}>
          {button.label}
        </button>
      </Link>
    )
}