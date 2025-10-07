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
    } else {
      return button.url || '#'
    }
  }

  const getBtnClassName = () => {
    const classes: string[] = []
    switch (true) {
      case button.pillSolid:
        classes.push('pill-button', 'dark')
        break
      case button.pillOutline:
        classes.push('pill-button', 'outline')
        break
      case button.downloadLink:
        classes.push('download')
        break
      case button.arrowLink:
        classes.push('arrow')
        break
      default:
        classes.push('underline')
        break
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