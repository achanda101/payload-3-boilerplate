import React from "react";
import Image from 'next/image'
import { UAFButton } from "@/components/UAFButton";

interface YellowCardDeckProps {
  title: string | null;
  desc: string | null;
  cards: {
    id: string;
    title: string | null;
    subtitle: string | null;
    desc: string | null;
    mascot?: {
      id: number;
      alt: string | null;
      url?: string | null;
      width?: number | null;
      height?: number | null;
      focalX?: number | null;
      focalY?: number | null;
    };
    mascotPos: 'top_left' | 'center';
    links: {
      id: string;
      desc: string | null;
      link: {
        type: string;
        newTab?: boolean | null;
        downloadLink?: boolean | null;
        arrowLink?: boolean | null;
        pillSolid?: boolean | null;
        pillOutline?: boolean | null;
        url?: string | null;
        email?: string | null;
        label: string | null;
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
        };
      };
    }[];
  }[];
}

export const YellowCardDeck: React.FC<YellowCardDeckProps> = ({
  title, desc, cards
}) => {
  return (
    <>
      {title && (
        <h3 className="col-span-full text-center">{title}</h3>
      )}
      {desc && (
        <p className="col-span-full text-center -mt-6">{desc}</p>
      )}

      <div className="col-span-full relative">
        {/* Desktop Slider View */}
        <div className="hidden md:block relative">
          <div className="flex gap-[1rem] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] scrollbar-hide items-stretch"
          >
            {cards?.map((card) => (
              <div className="turmeric_wavycard" key={card.id}>
                <div className="flex flex-col flex-shrink-1 w-60 px-[1.5rem] py-[2rem] h-full">
                  {card.mascot && (
                    <div className={`${card.mascotPos === 'top_left' ? 'p-0' : 'flex justify-center'}`}>
                      <Image
                        src={card.mascot.url || ''}
                        alt={card.mascot.alt || 'Mascot Image'}
                        width={Math.min(card.mascot.width || 120, 120)}
                        height={120}
                        sizes="(max-width: 768px) 100vw, 120px"
                        className={`${card.mascotPos === 'top_left' ? 'object-contain max-w-[65px] h-[65px]' : 'object-contain max-w-[120px] h-[120px]'}`}
                      />
                    </div>
                  )}
                  {card.title && <h3>{card.title}</h3>}
                  {card.subtitle && <h6>{card.subtitle}</h6>}
                  {card.desc && <p className="leading-snug">{card.desc}</p>}
                  {card.links && (
                    <div className="mt-3 flex flex-col gap-3">
                      {card.links.map((linkItem) => {
                        const link = linkItem.link;
                        const linkDesc = linkItem.desc;
                        return (
                          <div key={linkItem.id}>
                            {linkDesc && <p>{linkDesc}</p>}
                            <UAFButton button={link} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}