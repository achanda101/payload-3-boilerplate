import React from 'react'
import { GrantCard } from '@/components/GrantCard'

interface AssetCloud {
  id: string;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

interface GrantCardData {
  _status: ('draft' | 'published') | null;
  badgeText: string;
  badgeType: string;
  activePeriod: string;
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
      newTab?: boolean;
      downloadLink?: boolean;
      pillSolid?: boolean;
      pillOutline?: boolean;
      url?: string;
      label: string;
      email?: string;
      reference?: {
        relationTo?: string;
        value: {
          slug?: string;
        };
      }
    };
  }[];
}

interface GrantCardGridProps {
  grantCards: {
    grantCardGrid: GrantCardData[],
  }
}

export const GrantCardGrid: React.FC<GrantCardGridProps> = ({ grantCards }) => {

  const colouredCards = grantCards?.grantCardGrid?.filter(card => card.cardColour && card.cardColour !== 'trans' && card._status !== "draft");
  const transparentCards = grantCards?.grantCardGrid?.filter(card => card.cardColour && card.cardColour === 'trans' && card._status !== "draft");

  return (
    <>
      {colouredCards?.length > 0 ?  (colouredCards.map((card, index) => {
        const isLastOddCard = index === colouredCards.length - 1 && colouredCards.length % 2 === 1;        
        
        if (isLastOddCard) {
          return (
            <div key={index} className="col-span-6 md:col-span-4 md:col-start-3 lg:col-span-6 lg:col-start-4">
              <GrantCard {...card} />
            </div>
          )
        } else {
          return (
            <div key={index} className="col-span-6 md:col-span-4 lg:col-span-6">
              <GrantCard {...card} />
            </div>
          )
        }
      })) : null}
      {transparentCards?.length > 0 ? (transparentCards.map((card, index) => {
        const isLastOddCard = index === transparentCards.length - 1 && transparentCards.length % 2 === 1
        
        if (isLastOddCard) {
          return (
            <div key={index} className="col-span-6 md:col-span-4 md:col-start-3 lg:col-span-6 lg:col-start-4">
              <GrantCard {...card} specialGrant={true} />
            </div>
          )
        } else {
          return (
            <div key={index} className="col-span-6 md:col-span-4 lg:col-span-6">
              <GrantCard {...card} specialGrant={true} />
            </div>
          )
        }
      })) : null}
      
    </>
  )
}