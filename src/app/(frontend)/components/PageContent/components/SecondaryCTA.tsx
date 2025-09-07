import React from 'react';
import Link from 'next/link'

interface SecondaryCTAProps {
  key: number;
  title: string;
  subtitle: string;
  ctaButton: {
    buttonPrimary: boolean;
    link: {
      newTab: boolean;
      url: string;
      label: string;
    }
  }[];
}

export const SecondaryCTA: React.FC<SecondaryCTAProps> = ({
  key,
  title,
  subtitle,
  ctaButton
}) => {
  return (
    <div key={key} className="secondaryCTA">
      <div className="seccondaryCTA_titles">
        <h3 style={{ whiteSpace: 'pre-line' }}>{title}</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{subtitle}</p>
      </div>
      <div className="secondaryCTA_buttons">
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
      </div>
    </div>
  )
}