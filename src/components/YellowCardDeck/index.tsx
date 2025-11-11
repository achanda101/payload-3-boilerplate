import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { serializeLexical } from "@/components/RichText/serialize";

interface YellowCardDeckProps {
  blockName: string;
  title: string | null;
  desc: any;
  align: string;
  cards: {
    id: string;
    title: string | null;
    subtitle: string | null;
    desc: string | null;
    mascot?: {
      id: string;
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
  title, desc, cards, align
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [ canScrollNext, setCanScrollNext ] = useState(false);
  
  // accordion of yellow cards on mobile
  const [ openCard, setOpenCard ] = useState<string>(cards?.[0]?.id || "");
  const toggleCard = (id: string) => {
    setOpenCard(openCard === id ? "" : id);
  };

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  let currentCardWidth = 0;

  // Calculate width based on the number of cards and available space
  if (isDesktop) {
    const desiredCardWidth = Math.max(100 / cards.length, 18);
    currentCardWidth = Math.min(desiredCardWidth, 28);
  }
  if (isTablet) {
    const desiredCardWidth = Math.max(100 / cards.length, 40);
    currentCardWidth = Math.min(desiredCardWidth, 48);
  }
  
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
        <h3 className={`${align === 'left' ? 'col-span-6 text-left' : 'col-span-full text-center'}`}>{title}</h3>
      )}
      {desc && typeof desc === 'object' ? (
        <div className={`${align === 'left' ? 'col-start-1 col-span-6 text-left' : 'col-span-full text-center'} -mt-6`}>
          {serializeLexical({ nodes: desc.root?.children || [] })}
        </div>
      ) :
        <p className={`${align === 'left' ? 'col-span-6 text-left' : 'col-span-full text-center'} -mt-6`}>{desc}</p>
      }

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
                    <div
                      className={`px-[3rem] py-[2rem] h-full`}
                      style={{ width: `${currentCardWidth}vw` }}
                    >
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
                        {card.subtitle && <h6 className="text-left">{card.subtitle}</h6>}
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

        {/* Mobile/Tablet Accordion View */}
        <div className="lg:hidden space-y-4">
          {cards?.map((card) => (
            <div className="turmeric_wavycard" key={card.id}>
              <Collapsible
                open={openCard === card.id}
                onOpenChange={() => toggleCard(card.id)}
                className="text-card-foreground rounded-3xl overflow-hidden"
              >
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:opacity-90 transition-opacity">
                  {card.mascot ? (
                    <>
                      <div className="p-0 pr-3">
                        <Image
                          src={card.mascot.url || ''}
                          alt={card.mascot.alt || 'Mascot Image'}
                          width={Math.min(card.mascot.width || 120, 120)}
                          height={120}
                          sizes="(max-width: 768px) 100vw, 120px"
                          className="object-contain max-w-[65px] h-[65px]"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-4">
                        {card.title && <h3 className="-mb-3">{card.title}</h3>}
                        {card.subtitle && <h6 className="text-left">{card.subtitle}</h6>}
                      </div>
                    </>
                  ) :
                  (
                    <div className="flex items-start gap-4">
                      {card.title && <h3>{card.title}</h3>}
                      {card.subtitle && <h6 className="text-left">{card.subtitle}</h6>}
                    </div>
                  )}
                
                {openCard === card.id ? (
                  <ChevronUp className="w-6 h-6 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 flex-shrink-0" />
                )}
                </CollapsibleTrigger>
                <CollapsibleContent className="px-8 pb-10">
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
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}