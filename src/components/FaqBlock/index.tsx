import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UAFButton } from "../UAFButton";
import { serializeLexical } from "@/components/RichText/serialize";

interface FaqBlockProps {
  title: string | null;
  desc: string | null;
  blockName?: string | null;
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
  faqs: {
    id: string;
    question: string | null;
    answer: any;
  }[] | null;
}

export const FaqBlock: React.FC<FaqBlockProps> = ({
  title,
  desc,
  blockName,
  link,
  faqs
}) => {
  return (
    <div className="col-span-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-start">
        {/* Left Column - Title and Description */}
        <div className="flex flex-col gap-[0.5rem] h-full">
            <h3>
              {title}
            </h3>
            <p>
              {desc}
            </p>
          <div className="pt-[2rem] lg:pt-[7rem]">
            {link && <UAFButton button={link} />}
          </div>
        </div>

        {/* Right Column - FAQ Accordion */}
        <div className="lg:mt-0">
          <Accordion type="single" collapsible className="space-y-0">
            {faqs && faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-foreground"
              >
                <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:rotate-45">
                  <h6 className="text-left mb-0">{faq.question}</h6>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  {faq.answer && typeof faq.answer === 'object' ? (
                    <div>
                      {serializeLexical({ nodes: faq.answer.root?.children || [] })}
                    </div>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}