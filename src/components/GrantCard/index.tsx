import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ButtonArray } from '@/components/ButtonArray';

interface AssetCloud {
  id: string;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

interface GrantCardProps {
  badgeText: string;
  badgeType: string;
  title: string;
  desc: string;
  cardColour?: string;
  mascot?: AssetCloud | null;
  grantSpecs: {
    id: string
    spec: string
  }[];
  grantUses: string;
  cardButtons: {
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
    };
  }[];
  specialGrant?: boolean;
}

export const GrantCard: React.FC<GrantCardProps> = ({
  badgeText,
  badgeType,
  title,
  desc,
  cardColour,
  mascot,
  grantSpecs=[],
  grantUses='',
  cardButtons,
  specialGrant=false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      {specialGrant ? (
        <div className={`grant-card`}>
          <div className='flex flex-col justify-between gap-[1.25rem]'>
            <hr/>
            {badgeText && badgeText !== '' ? (
              <div className="flex justify-center mb-4">
                <div className={`badge ${badgeType}`}>
                  <p className="tag">{badgeText}</p>
                </div>
              </div>
            ) : <></>}
          
            <div className="text-center mb-3">
              <h5>{title}</h5>
            </div>
              
            <p className="text-center mb-4">
              {desc}
            </p>

            <div className={`text-center`}>
              <Image 
                src={(typeof mascot === 'object' && mascot?.url) || '/mascots/default-mascot.png'} 
                width={Math.min(mascot?.width || 220, 220)}
                height={180}
                sizes="(max-width: 768px) 100vw, 180px"
                alt={(typeof mascot === 'object' && mascot?.alt) || 'Mascot Image'}
                className="mx-auto object-contain max-w-[220px] h-[180px] my-4"
              />
            </div>

            {grantSpecs && grantSpecs.length > 0 && (
              <div className="text-center">
                <p className="tag">
                  {grantSpecs?.map((spec) => spec.spec).join(' • ') || ''}
                </p>
              </div>
            )}

            {grantUses && grantUses !== '' && (
              <div className='w-[95%] mx-auto'>
                <div className="flex items-start justify-center gap-[0.5rem]">
                    <p className='tag whitespace-nowrap'>COMMON USES:</p>
                    <p className="tag sml text-center">
                      {grantUses}
                    </p>
                </div>
              </div>
            )}

            <ButtonArray btnArray={cardButtons} colStackOnMobile={false} />

            <hr/>
          </div>
        </div>
      ) : (
        <div className={`grant-card bg-${cardColour}`}>
          
            <div>
              {badgeText && badgeText !== '' && (
              <div className="flex justify-center mb-4">
                <div className={`badge ${badgeType}`}>
                  <p className="tag">{badgeText}</p>
                </div>
              </div>
              )}

            <div className="text-center mb-2">
              <h5>{title}</h5>
            </div>
              
            <p className="text-center mb-2">
              {desc}
            </p>

            {/* Mobile Read More Button - Only show when not expanded */}
            {!isExpanded && (
              <div className="block md:hidden text-center mb-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center mx-auto text-grant-text-dark font-medium hover:opacity-80 transition-opacity"
                >
                  Read More
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Middle section - Mascot */}
          <div className={`text-center ${!isExpanded ? 'hidden md:block' : 'block'}`}>
            <Image 
                src={(typeof mascot === 'object' && mascot?.url) || '/mascots/default-mascot.png'} 
                width={Math.min(mascot?.width || 220, 220)}
                height={180}
                alt={(typeof mascot === 'object' && mascot?.alt) || 'Mascot Image'}
                className="mx-auto object-contain max-w-[220px] h-[180px] my-1"
            />
          </div>

          {/* Bottom section - Desktop Content */}
          <div className={`${!isExpanded ? 'hidden md:block' : 'block'}`}>
            {grantSpecs && grantSpecs.length > 0 && (
              <div className="space-y-2 mb-4">
                <hr />
                <div className="text-center">
                  <p className="tag">
                    {grantSpecs?.map((spec) => spec.spec).join(' • ') || ''}
                  </p>
                </div>
                <hr />
              </div>)}

              {grantUses && grantUses !== '' && (
                <div className='w-[95%] mx-auto'>
                  <div className="flex items-start justify-center gap-[0.5rem]">
                      <p className='tag whitespace-nowrap'>COMMON USES:</p>
                      <p className="tag sml text-center">
                        {grantUses}
                      </p>
                  </div>
                </div>
              )}

              <ButtonArray btnArray={cardButtons} colStackOnMobile={false} />


            {/* Mobile Read Less Button - Only show when expanded */}
            {isExpanded && (
              <div className="block md:hidden text-center mt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center mx-auto text-grant-text-dark font-medium hover:opacity-80 transition-opacity"
                >
                  Read Less
                  <ChevronDown className="ml-2 w-4 h-4 transform rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
};
