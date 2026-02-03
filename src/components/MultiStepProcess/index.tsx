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

  const activeData = steps[activeStep];

  return (
    <>
      <Heading level={4} className="col-span-6 col-start-1">{title}</Heading>
      <p className="col-span-6 col-start-1 -mt-6">{subtitle}</p>
      <div className="col-span-full lg:col-span-5 lg:col-start-1">
        <div className="flex flex-col gap-[1.5rem]">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <div key={step.id}>
                <button
                  onClick={() => { setActiveStep(index); setCurrentStep(steps[index]) }}
                  className="w-full text-left"
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

                {/* Mobile/Tablet: Show detail card below step */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
                  isActive ? "max-h-[2000px] pb-6" : "max-h-0"
                }`}>
                  <div className="beige_wavycard mt-4">
                    <div className="flex flex-col gap-1 p-[2rem]">
                      {React.createElement(iconMap[step.icon], { className: "w-10 h-10 text-color-light mb-3" })}
                      <Heading level={6}>
                        {step.title}
                      </Heading>
                      {step.details?.length > 0 && (
                        <ul className="flex flex-col gap-[2px] mt-2">
                          {step.details?.map((detail, idx) => (
                            <li key={idx} className="flex gap-1 tight text-sm">
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
                      {step.tip && (
                        <>
                          <hr className="mt-3"/>
                          <div className="flex gap-2 mt-2">
                            <Lightbulb className="w-4 h-4 text-foreground/70 flex-shrink-0 mt-0.5" />
                            {typeof step.tip === 'object' ? (
                              <div className="text-xs text-foreground/80">
                                {serializeLexical({ nodes: step.tip.root?.children || [] })}
                              </div>
                            ): (
                              <p className="text-xs text-foreground/80">{step.tip}</p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop: Detail Card on Right */}
      {activeData && (
        <div className="hidden lg:block lg:col-start-7 lg:col-span-6 sticky top-8 self-start">
          <div className="beige_wavycard">
            <div className="flex flex-col gap-1 p-[3.5rem]">
              {React.createElement(iconMap[activeData.icon], { className: "w-12 h-12 text-color-light mb-4" })}
              <Heading level={6}>
                {activeData.title}
              </Heading>
              {activeData.details?.length > 0 && (
                <ul className="flex flex-col gap-[2px]">
                  {activeData.details?.map((detail, index) => (
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
              {activeData.tip && (
                <>
                  <hr className="mt-4"/>
                  <div className="flex gap-3 mt-2">
                    <Lightbulb className="w-5 h-5 text-foreground/70 flex-shrink-0 mt-0.5" />
                    {typeof activeData.tip === 'object' ? (
                      <div className="text-sm text-foreground/80">
                        {serializeLexical({ nodes: activeData.tip.root?.children || [] })}
                      </div>
                    ): (
                      <p className="text-sm text-foreground/80">{activeData.tip}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}