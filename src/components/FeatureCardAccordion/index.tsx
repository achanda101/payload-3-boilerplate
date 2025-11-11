import React, { useState } from "react";
import Image from "next/image";
import { Lightbulb, Minus, Plus } from "lucide-react";
import { serializeLexical } from "@/components/RichText/serialize";

interface AssetCloud {
  id: string;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

interface FeatureCardAccordionProps {
  title: string | null;
  blockName: string;
  featureCards: {
    id: string;
    crdColour: string | null;
    mascot: AssetCloud | null;
    accTitle: string | null;
    crdTag: string | null;
    accContent: any;
    crdContent: any;
  }[] | null;
}

export const FeatureCardAccordion: React.FC<FeatureCardAccordionProps> = ({
  title,
  blockName,
  featureCards
}) => {

  const [activeItem, setActiveItem] = useState<string>(featureCards?.[0]?.id || "");

  const toggleItem = (id: string) => {
    setActiveItem(prev => prev === id ? "" : id);
  };

  const activeData = featureCards?.find(item => item.id === activeItem);

  return (
    <>
      <div className="page_column_layout gap-6 gap-y-0">
        {title && (  
            <div className="col-span-5 col-start-1">
              <h3>{title}</h3>
            </div>
        )}
        {/* Accordion Section */}
        <div className="col-start-1 col-span-full lg:col-start-1 lg:col-span-5">
          {featureCards?.map((card, index) => 
            <div key={card.id} className="border-b border-border">
              <button
                  onClick={() => toggleItem(card.id)}
                  className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
              >
                <h6 className="inline-block">{card.accTitle}</h6>
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 border-foreground">
                  {activeItem === card.id ? (
                    <Minus className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </span>
              </button>
                
              {/* Mobile/Tablet: Show description and detail card below accordion item */}
              <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
                  activeItem === card.id ? "max-h-[2000px] pb-6" : "max-h-0"
                }`}>
                <div className="text-base text-foreground mb-6 leading-relaxed">
                  {card.accContent && typeof card.accContent === 'object' ? (
                    serializeLexical({ nodes: card.accContent.root?.children || [] })
                  ) : (
                    card.accContent
                  )}
                </div>
                <div className="forest_featurecard">
                  <div
                    className="relative p-8 rounded-[2rem]"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-wide">{card.crdTag}</span>
                      </div>
                      
                      <div className="text-base leading-relaxed mb-6">
                        {card.accContent && typeof card.accContent === 'object' ? (
                          serializeLexical({ nodes: card.accContent.root?.children || [] })
                        ) : (
                            <p>{card.accContent}</p>
                        )}
                      </div>
                      {card.mascot && (
                        <div className="flex justify-left">
                          <Image
                            src={card.mascot.url || ''}
                            alt={card.mascot.alt || 'Mascot Image'}
                            width={Math.min(card.mascot.width || 120, 120)}
                            height={150}
                            sizes="(max-width: 768px) 100vw, 120px"
                            className='object-contain max-w-[85px] h-[85px]'
                          />
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Show only description below accordion item */}
              <div className={`hidden lg:block overflow-hidden transition-all duration-300 ${
                activeItem === card.id ? "max-h-96 pb-6" : "max-h-0"
              }`}>
                <div className="text-lg text-foreground leading-relaxed">
                  {card.accContent && typeof card.accContent === 'object' ? (
                    serializeLexical({ nodes: card.accContent.root?.children || [] })
                  ) : (
                    <p>{card.accContent}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop: Detail Card on Right */}
        {activeData && (
          <div className="hidden lg:block lg:col-start-7 lg:col-span-6 sticky top-8 self-start">
            <div className="forest_featurecard">
              <div 
                  className="relative p-12 rounded-[3rem] transition-all duration-500"
              >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6" />
                  <span className="font-bold text-lg uppercase tracking-wide">{activeData.crdTag}</span>
                </div>
                
                <div className="text-xl leading-relaxed mb-8">
                  {activeData.crdContent && typeof activeData.crdContent === 'object' ? (
                    serializeLexical({ nodes: activeData.crdContent.root?.children || [] })
                  ) : (
                    <p>{activeData.crdContent}</p>
                  )}
                </div>
                {activeData.mascot && (
                  <div className="flex justify-left">
                    <Image
                      src={activeData.mascot.url || ''}
                      alt={activeData.mascot.alt || 'Mascot Image'}
                      width={Math.min(activeData.mascot.width || 120, 120)}
                      height={150}
                      sizes="(max-width: 768px) 100vw, 120px"
                      className='object-contain max-w-[85px] h-[85px]'
                    />
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}