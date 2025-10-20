import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import WheelGestures from "embla-carousel-wheel-gestures";
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
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [ canScrollNext, setCanScrollNext ] = useState(false);

  console.log('Deck:', title);
  console.log('Total cards:', cards.length);
  const cardWidth = (cards.length > 0? 100/cards.length : 0);
  console.log('Calculated cardWidth:', cardWidth);

  // Calculate width based on the number of cards and available space
  // Desktop view constraints
  const desk_maxCardWidth = 28; // Maximum card width
  const desk_minCardWidth = 18; // Minimum card width
  const desk_desiredCardWidth = Math.max(100 / cards.length, desk_minCardWidth);
  const desk_currentCardWidth = Math.min(desk_desiredCardWidth, desk_maxCardWidth);
  
  // Tablet view constraints
  const tab_maxCardWidth = 42; // Maximum card width
  const tab_currentCardWidth = Math.min(100 / cards.length, tab_maxCardWidth);
  
  useEffect(() => {
    if (!api) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollButtons();
    api.on("select", updateScrollButtons);
    api.on("reInit", updateScrollButtons);

    return () => {
      api.off("select", updateScrollButtons);
      api.off("reInit", updateScrollButtons);
    };
  }, [api]);

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
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
            plugins={[WheelGestures()]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {cards?.map((card) => (
                <CarouselItem
                  key={card.id}
                  className="pl-4 mx-auto basis-auto"
                >
                    <div className="turmeric_wavycard">
                    <div className={`px-[3rem] py-[2rem] md:w-[${tab_currentCardWidth}vw] lg:w-[${desk_currentCardWidth}vw] h-full`}>
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
                  </CarouselItem>
                ))}
            </CarouselContent>

            {canScrollPrev && (
              <button
                onClick={() => api?.scrollPrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            {canScrollNext && (
              <button
                onClick={() => api?.scrollNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

          </Carousel>
        </div>
      </div>
    </>
  )
}