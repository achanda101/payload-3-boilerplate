import React from 'react'
import { GrantCard } from '@/components/GrantCard'

interface MediaCloud {
  id: number;
  alt: string;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

interface GrantCardData {
  badgeText: string;
  badgeType: string;
  activePeriod: string;
  title: string;
  desc: string;
  cardColour?: string;
  mascot?: MediaCloud | null;
  grantSpecs: {
    id: number
    spec: string
  }[];
  grantUses: string;
  cardButtons: {
    id: number;
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
  grantCards: GrantCardData[],
  showSpecialGrantCard?: boolean
}

export const GrantCardGrid: React.FC<GrantCardGridProps> = ({ grantCards, showSpecialGrantCard=false }) => {

  const colouredCards = grantCards.filter(card => card.cardColour && card.cardColour !== 'trans' && card.activePeriod !== 'closed');
  const transparentCards = grantCards.filter(card => !card.cardColour || card.cardColour === 'trans' && card.activePeriod !== 'closed');

  return (
    <>
      {colouredCards.length > 0 ?  (colouredCards.map((card, index) => {
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
      {showSpecialGrantCard && transparentCards.length > 0 ? (transparentCards.map((card, index) => {
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