import React, { useState } from "react";
import Link from "next/link";
import { get } from "http";


interface ButtonItem { 
  id: number;
  link: {
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

type ButtonArrayProps = ButtonItem[]

export const ButtonArray: React.FC<{ btnArray: ButtonArrayProps, colStackOnMobile: boolean }> = ({ btnArray, colStackOnMobile=false }) => {
  
  const getBtnArrayClassName = () => {
    const classes: string[] = ['btn-array']
    if (colStackOnMobile) {
      classes.push('col-stack-mobile')
    }
    return classes.join(' ')
  } 
  
  return (
    <div className={getBtnArrayClassName()}>
      {btnArray.map((button, index) => {

        const getHref = () => {
          if (!button.link) return '#'
          if (button.link.type === 'reference') {
            return `/${button.link.reference?.relationTo}/${button.link.reference?.value?.slug}` || '#'
          } else if (button.link.type === 'email') {
            return `mailto:${button.link.email}` || '#'
          } else {
            return button.link.url || '#'
          }
        }

        const getBtnClassName = () => {
          const classes: string[] = []
          switch (true) {
            case button.link.pillSolid:
              classes.push('pill-button', 'dark')
              break
            case button.link.pillOutline:
              classes.push('pill-button', 'outline')
              break
            case button.link.downloadLink:
              classes.push('download')
              break
            default:
              classes.push('arrow')
              break
          }
          return classes.join(' ')
        }

        return (
          <Link
            key={index}
            href={getHref()}
            target={button.link?.newTab ? '_blank' : '_self'}
          >
            <button className={getBtnClassName()}>
              {button.link.label}
            </button>
          </Link>
        )
      })}
    </div>
  )

  

}