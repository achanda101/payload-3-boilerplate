'use client'

import React from "react";
import { UAFButton } from "@/components/UAFButton";

interface MultiColumnInfoProps {
  infoColumns?: {
    addLink: boolean;
    title?: string;
    colContent?: string;
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
    }
  }[]
}

export const MultiColumnInfo: React.FC<MultiColumnInfoProps> = ({ infoColumns }) => {
  return (
    <>
      <hr className="col-span-full"/>
      {infoColumns?.map((col, index) => {
        return (
          <div className="col-span-3 md:col-span-4 lg:col-span-3" key={index}>
            <div className="flex flex-col">
              <p className="tag">{col.title}</p>
              <p style={{ whiteSpace: 'pre-line' }}>{col.colContent}</p>
              {col.addLink && col.link?.label && (
                <div className="mt-2">
                  <UAFButton
                    button={col.link}
                  />
                </div>
              )}
            </div>
          </div>
        )
      })}
      <hr className="col-span-full"/>
    </>
  )
}