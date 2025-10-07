import React from 'react';
import Link from 'next/link'
import { ButtonArray } from '@/components/ButtonArray';

interface SecondaryCTAProps {
  title: string;
  subtitle: string;
  ctaButton: {
    id: number,
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
}

export const SecondaryCTA: React.FC<SecondaryCTAProps> = ({
  title,
  subtitle,
  ctaButton
}) => {
  return (
    <div className="secondaryCTA">
      <div className="seccondaryCTA_titles">
        <h3 style={{ whiteSpace: 'pre-line' }}>{title}</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{subtitle}</p>
      </div>
      <ButtonArray btnArray={ctaButton} colStackOnMobile={true} />

      {/* <div className="secondaryCTA_buttons">
        {ctaButton && ctaButton.length > 0 && (
        ctaButton.map((cta, index) => (
            <Link
              key={index}
              href={cta.link?.url || '#'}
              target={cta.link?.newTab ? '_blank' : '_self'}
            >
              <button className={`pill-button ${cta.buttonPrimary ? 'dark' : ''}`}>
                {cta.link?.label}
              </button>
            </Link>
          ))
        )}
      </div> */}
    </div>
  )
}