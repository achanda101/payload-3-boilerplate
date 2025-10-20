import React from "react";
import { ButtonArray } from "@/components/ButtonArray";

interface ComparisonBlockProps {
  title: string | null;
  desc: string | null;
  buttons?: {
    id: string;
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
  }[];
  lftCol: {
    title: string | null;
    desc: string | null;
    lftPoints: {
      id: string;
      point: string | null;
    }[];
  };
  rtCol: {
    title: string | null;
    desc: string | null;
    rtPoints: {
      id: string;
      point: string | null;
    }[];
  }
}

export const ComparisonBlock: React.FC<ComparisonBlockProps> = ({
  title, desc, buttons, lftCol, rtCol
}) => {
  return (
    <>
      {title && (
        <h4 className="col-span-6 col-start-1">{title}</h4>
      )}
      {desc && (
        <p className="col-span-6 col-start-1 -mt-6">{desc}</p>
      )}

      {lftCol && (
        <div className="col-span-6 md:col-start-2 lg:col-start-1 bg-beige rounded-[2.5rem] py-[2rem] lg:py-[3.75rem] px-[1.25rem] lg:px-[2.5rem]">
          <div className="flex flex-col">
            {lftCol.title && <h4>{lftCol.title}</h4>}
            {lftCol.desc && <p>{lftCol.desc}</p>}
            {lftCol.lftPoints && (
              <ul className="mt-[1.5rem]">
                {lftCol.lftPoints.map((point, index) => {
                  if (!point.point) return null
                  return (
                    <li key={point.id} className="checkmark pl-5 -indent-5">
                      {point.point}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}
      {rtCol && (
        <div className="col-span-6 md:col-start-2 lg:col-start-7 py-[2rem] lg:py-[3.75rem] px-[1.25rem] lg:px-[2.5rem]">
          <div className="flex flex-col">
            {rtCol.title && <h4>{rtCol.title}</h4>}
            {rtCol.desc && <p>{rtCol.desc}</p>}
            {rtCol.rtPoints && (
              <ul className="mt-[1.5rem]">
                {rtCol.rtPoints.map((point, index) => {
                  if (!point.point) return null
                  return (
                    <li key={point.id} className="crossmark pl-5 -indent-5">
                      {point.point}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}
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

