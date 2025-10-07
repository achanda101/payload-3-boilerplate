import React from "react";
import { ButtonArray } from '@/components/ButtonArray';

interface SingleColumnInfoProps {
  title: string | null;
  desc: string | null;
  buttons?: {
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
    }
  }[]
}

export const SingleColumnInfo: React.FC<SingleColumnInfoProps> = ({
  title, desc, buttons
}) => {
  return (
    <>
    <div className="col-span-full lg:col-span-6 lg:col-start-4">
      <div className="flex flex-col items-center text-center">
        <h4>
          {title}
        </h4>
        <h5>
          {desc}
        </h5>
      </div>
    </div>
    <div className="col-span-full">
        <div className="flex items-center justify-center">
          {buttons && (
            <ButtonArray btnArray={buttons} colStackOnMobile={true} />
          )}
        </div>
    </div>
    </>
  )
}