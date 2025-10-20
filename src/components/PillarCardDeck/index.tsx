import React from "react";
import Image from 'next/image'

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
      {/* Desktop Slider View */}
      <div className="col-span-full">
        <div className="hidden md:flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {cards?.map((card, index) => (
            <div key={card.id} className="flex-shrink-0 w-60 turmeric_wavycard p-8 relative">
              {card.mascot && (
                <div className={`absolute ${card.mascotPos === 'top_left' ? 'top-6 left-6' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}`}>
                  <Image
                    src={card.mascot.url || ''}
                    alt={card.mascot.alt || 'Mascot Image'}
                    width={card.mascot.width || 100}
                    height={card.mascot.height || 100}
                  />
                </div>
              )}
              {card.title && <h3>{card.title}</h3>}
              {card.subtitle && <h6 className="mt-2">{card.subtitle}</h6>}
              {card.desc && <p className="mt-4">{card.desc}</p>}
              {card.links && (
                <div className="mt-6 flex flex-col gap-3">
                  {card.links.map((linkItem) => {
                    const link = linkItem.link;
                    const linkDesc = linkItem.desc;
                    if (!link.url && !link.email) return null;
                    const href = link.url ? link.url : `mailto:${link.email}`;
                    return (
                      <>
                        {linkDesc && <p className="mb-1">{linkDesc}</p>}
                        <a
                          key={linkItem.id}
                          href={href}
                          target={link.newTab ? '_blank' : '_self'}
                          rel={link.newTab ? 'noopener noreferrer' : undefined}
                          className={`
                            ${link.pillSolid ? 'bg-black text-white px-4 py-2 rounded-full' : ''}
                            ${link.pillOutline ? 'border border-black text-black px-4 py-2 rounded-full' : ''}
                            ${!link.pillSolid && !link.pillOutline ? 'underline' : ''}
                          `}
                          >
                          {link.label}
                        </a>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}