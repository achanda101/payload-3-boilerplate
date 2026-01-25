import React, { useState } from "react";
import {
  FileText,
  Search,
  ShieldCheck,
  Vote,
  ScrollText,
  Banknote,
  Rocket,
  FileCheck,
  Clock,
  Lightbulb,
} from "lucide-react";
import { serializeLexical } from "@/components/RichText/serialize";
import { Heading } from "@/components/Heading";

interface MultiStepProcessProps {
  title: string;
  subtitle: string;
  steps: {
    id: string;
    icon: string;
    stepTitle: string;
    title: string;
    tip?: any;
    details: {
      bullet: any;
    }[]
  }[]
}

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Search,
  ShieldCheck,
  Vote,
  ScrollText,
  Banknote,
  Rocket,
  FileCheck,
  Clock,
  Lightbulb,
};

export const MultiStepProcess: React.FC<MultiStepProcessProps> = ({ title, subtitle, steps }) => {
  const [ activeStep, setActiveStep ] = useState(0);
  const [currentStep, setCurrentStep] = useState(steps[0])

  return (
    <>
      <Heading level={4} className="col-span-6 col-start-1">{title}</Heading>
      <p className="col-span-6 col-start-1 -mt-6">{subtitle}</p>
      <div className="col-span-5 col-start-1">
        <div className="flex flex-col gap-[1.5rem]">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => { setActiveStep(index); setCurrentStep(steps[index]) }}
              >
                <Heading level={6} className={`flex gap-[1.5rem] ${
                    isActive
                      ? "text-color-dark"
                      : "text-color-vlight"
                  }`}>
                  <span>
                    {String(index+1).padStart(2, "0")}
                  </span>
                  <span className="capitalize">
                    {step.stepTitle}
                  </span>
                </Heading>
                <hr className={`mt-[1.5rem] ${
                    isActive
                      ? "bg-color-dark"
                      : "bg-color-vlight"
                  }`}/>
              </button>
            )
          })}
        </div>
      </div>
      <div className="col-span-6 col-start-7">
        <div className="beige_wavycard">
          <div className="flex flex-col gap-1 p-[3.5rem]">
            {React.createElement(iconMap[currentStep.icon], { className: "w-12 h-12 text-color-light mb-4" })}
            <Heading level={6}>
              {currentStep.title}
            </Heading>
            {currentStep.details?.length > 0 && (
              <ul className="flex flex-col gap-[2px]">
                {currentStep.details?.map((detail, index) => (
                  <li key={index} className="flex gap-1 tight">
                    <span>•</span>
                    {detail.bullet && typeof detail.bullet === 'object' ? (
                      <span>
                        {serializeLexical({ nodes: detail.bullet.root?.children || [] })}
                      </span>
                    ) : (
                      <span>{detail.bullet}</span>  
                    )}
                  </li>
                ))}
              </ul>
            )}
            {currentStep.tip && (
              <>
                <hr className="mt-4"/>
                <div className="flex gap-3 mt-2">
                  <Lightbulb className="w-5 h-5 text-foreground/70 flex-shrink-0 mt-0.5" />
                  {typeof currentStep.tip === 'object' ? (
                    <div className="text-sm text-foreground/80">
                      {serializeLexical({ nodes: currentStep.tip.root?.children || [] })}
                    </div>
                  ): (
                    <p className="text-sm text-foreground/80">{currentStep.tip}</p>  
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}