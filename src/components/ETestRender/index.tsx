import React, { useState, useEffect } from 'react'
import { XCircle } from 'lucide-react'
import { serializeLexical } from '@/components/RichText/serialize'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel_etest'
import { UAFButton } from '@/components/UAFButton'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import { Heading } from '@/components/Heading'

interface AssetCloud {
  id: string
  alt: string
  url?: string | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

interface ETestLink {
  link?: {
    type: string
    url?: string | null
    newTab?: boolean | null
    reference?: {
      relationTo?: string
      value: {
        slug?: string
      }
    }
    downloadLink?: boolean | null
    arrowLink?: boolean | null
    pillSolid?: boolean | null
    pillOutline?: boolean | null
    label: string | null
    etestlink?: {
      relationTo?: string
      value: {
        introCard?: object | null
        critList?: object | null
        isECard?: object | null
        notECard?: object | null
      }
    }
  }
}

interface ETestData {
  relationTo?: string
  value: {
    introCard?: {
      introTitle?: string | null
      introDesc?: Record<string, any> | null
    }
    critList?: {
      criteria?:
        | {
            question?: string | null
            reason?: string | null
            options?:
              | {
                  optionText?: string | null
                  isEligible?: boolean | null
                  isCustom?: boolean | null
                  customResponse?: Record<string, any> | null
                }[]
              | null
          }[]
        | null
    } | null
    isECard?: {
      isETitle?: string | null
      isEDesc?: Record<string, any> | null
      isELink?: ETestLink | null
      isEMascot?: AssetCloud | null
    } | null
    notECard?: {
      notETitle?: string | null
      notEDesc?: Record<string, any> | null
      notELink?: ETestLink | null
      notEMascot?: AssetCloud | null
    } | null
  }
}

interface ETestRenderProps {
  etestData: ETestData | null | undefined
  onClose: () => void
}

export const ETestRender: React.FC<ETestRenderProps> = ({ etestData, onClose }) => {
  const [hasStarted, setHasStarted] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [showNotEligible, setShowNotEligible] = useState(false)
  const [showEligible, setShowEligible] = useState(false)
  const [customResponse, setCustomResponse] = useState<Record<string, any> | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [incompleteAnswers, setIncompleteAnswers] = useState(false)

  const introCard = etestData?.value?.introCard
  const introTitle = introCard?.introTitle
  const introDesc = introCard?.introDesc
  const criteria = etestData?.value?.critList?.criteria || []
  const notECard = etestData?.value?.notECard
  const isECard = etestData?.value?.isECard

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleStart = () => {
    if (criteria.length === 0) {
      onClose()
      return
    }
    setHasStarted(true)
  }

  const handleOptionChange = (
    criteriaIndex: number,
    optionText: string,
    isEligible: boolean,
    isCustom?: boolean,
    customResponseData?: Record<string, any> | null,
  ) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [criteriaIndex]: optionText,
    }))

    if (isCustom && customResponseData) {
      setCustomResponse(customResponseData)
    } else if (!isEligible) {
      setShowNotEligible(true)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  // Shared content rendering
  const renderContent = () => (
    <>
      {!hasStarted ? (
        <div className="p-12">
          <Heading
            level={2}
            className="text-4xl font-bold mb-6 text-black text-left"
            style={{ fontFamily: 'serif' }}
          >
            {introTitle || 'Your Grant Eligibility'}
          </Heading>
          {introDesc && typeof introDesc === 'object' ? (
            <div className="mb-8 text-base leading-relaxed text-black text-left">
              {serializeLexical({
                nodes: introDesc.root?.children || [],
              })}
            </div>
          ) : introDesc ? (
            <p className="mb-8 text-base leading-relaxed text-black text-left">
              {String(introDesc)}
            </p>
          ) : null}
          <div className="text-left">
            <button className="pill-button dark" onClick={handleStart}>
              Start
            </button>
          </div>
        </div>
      ) : customResponse ? (
        <div className="p-12">
          {typeof customResponse === 'object' ? (
            <div className="mb-8 text-base leading-relaxed text-black text-left">
              {serializeLexical({
                nodes: customResponse.root?.children || [],
              })}
            </div>
          ) : customResponse ? (
            <p className="mb-8 text-base leading-relaxed text-black text-left">
              {String(customResponse)}
            </p>
          ) : null}
        </div>
      ) : showNotEligible ? (
        <div className="p-12">
          {incompleteAnswers ? (
            <>
              <Heading level={4} className="text-2xl font-bold mb-6 text-black leading-relaxed text-left">
                Please Answer All Questions
              </Heading>
              <p className="mb-8 text-base leading-relaxed text-black text-left">
                You need to answer all questions to complete the eligibility test. Please go back
                and make sure you&apos;ve selected an option for each question.
              </p>
              <div className="text-left">
                <button
                  onClick={() => {
                    setShowNotEligible(false)
                    setIncompleteAnswers(false)
                  }}
                  className="pill-button dark"
                >
                  Go Back
                </button>
              </div>
            </>
          ) : (
            <>
              <Heading level={4} className="text-2xl font-bold mb-6 text-black leading-relaxed text-left">
                {notECard?.notETitle}
              </Heading>
              {notECard?.notEDesc && typeof notECard.notEDesc === 'object' ? (
                <div className="mb-8 text-base leading-relaxed text-black text-left">
                  {serializeLexical({
                    nodes: notECard.notEDesc.root?.children || [],
                  })}
                </div>
              ) : notECard?.notEDesc ? (
                <p className="mb-8 text-base leading-relaxed text-black text-left">
                  {String(notECard.notEDesc)}
                </p>
              ) : null}
              {notECard?.notELink?.link && (
                <div onClick={handleClose} className="text-left">
                  <UAFButton button={notECard.notELink.link as any} />
                </div>
              )}
            </>
          )}
        </div>
      ) : showEligible ? (
        <div className="p-12">
          <Heading level={4} className="text-2xl font-bold mb-6 text-black leading-relaxed text-left">
            {isECard?.isETitle}
          </Heading>
          {isECard?.isEDesc && typeof isECard.isEDesc === 'object' ? (
            <div className="mb-8 text-base leading-relaxed text-black text-left">
              {serializeLexical({
                nodes: isECard.isEDesc.root?.children || [],
              })}
            </div>
          ) : isECard?.isEDesc ? (
            <p className="mb-8 text-base leading-relaxed text-black text-left">
              {String(isECard.isEDesc)}
            </p>
          ) : null}
          {isECard?.isELink?.link && (
            <div onClick={handleClose} className="text-left">
              <UAFButton button={isECard.isELink.link as any} />
            </div>
          )}
        </div>
      ) : (
        <div className="etest_carousel p-12 overflow-hidden">
          {/* Carousel Dots */}
          <div className="flex items-center gap-2 mb-8">
            {criteria.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`rounded-full transition-all ${
                  index === current
                    ? 'w-8 h-8 bg-black text-white text-sm font-semibold flex items-center justify-center'
                    : index < current
                      ? 'w-8 h-8 bg-black text-white text-sm font-semibold flex items-center justify-center'
                      : 'w-3 h-3 bg-gray-300'
                }`}
              >
                {(index === current || index < current) && index + 1}
              </button>
            ))}
          </div>

          <Carousel className="w-full mb-8" opts={{ align: 'start', loop: false }} setApi={setApi}>
            <CarouselContent className="-ml-0">
              {criteria.map((criterion, index) => (
                <CarouselItem key={index} className="pl-0 basis-full">
                  <div className="space-y-6 w-full">
                    <Heading level={5} className="text-xl font-semibold text-black leading-relaxed text-left">
                      {criterion?.question}
                    </Heading>
                    {criterion?.reason && (
                      <div className="space-y-1 text-left">
                        <p className="text-sm text-gray-700" style={{ whiteSpace: 'pre-line' }}>
                          {criterion.reason}
                        </p>
                      </div>
                    )}
                    <div className="border-[1px] border-black rounded-2xl p-6 space-y-4 bg-background">
                      {criterion?.options?.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option?.optionText || ''}
                              checked={selectedAnswers[index] === option?.optionText}
                              onChange={() =>
                                handleOptionChange(
                                  index,
                                  option?.optionText || '',
                                  option?.isEligible ?? true,
                                  option?.isCustom ?? false,
                                  option?.customResponse ?? null,
                                )
                              }
                              className="w-6 h-6 border-[1px] border-black rounded-full appearance-none checked:bg-black checked:border-black cursor-pointer"
                            />
                            {selectedAnswers[index] === option?.optionText && (
                              <div className="absolute w-3 h-3 bg-white rounded-full pointer-events-none" />
                            )}
                          </div>
                          <span className="text-base text-black">{option?.optionText}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {current > 0 && (
              <button onClick={() => api?.scrollPrev()} className="pill-button outline">
                Back
              </button>
            )}
            {current < criteria.length - 1 ? (
              <button onClick={() => api?.scrollNext()} className="pill-button dark">
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  // Check if all questions were answered
                  const allAnswered = criteria.every(
                    (_, index) => selectedAnswers[index] !== undefined,
                  )

                  if (!allAnswered) {
                    // Show not eligible if user didn't answer all questions
                    setIncompleteAnswers(true)
                    setShowNotEligible(true)
                  } else {
                    // Show eligible only if all questions were answered
                    setShowEligible(true)
                  }
                }}
                className="pill-button dark"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )

  // Render drawer for mobile
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DrawerContent className="bg-[#F3E8D6] border-[1px] border-black max-h-[90vh] overflow-y-auto">
          <DrawerTitle className="sr-only">
            {!hasStarted
              ? introTitle || 'Your Grant Eligibility'
              : customResponse
                ? 'Response'
                : showNotEligible
                  ? notECard?.notETitle || 'Not Eligible'
                  : showEligible
                    ? isECard?.isETitle || 'Eligible'
                    : 'Eligibility Test'}
          </DrawerTitle>
          <DrawerClose className="absolute top-4 right-4 hover:opacity-70 transition-opacity z-10">
            <XCircle size={24} className="text-black" />
          </DrawerClose>
          {renderContent()}
        </DrawerContent>
      </Drawer>
    )
  }

  // Render dialog for desktop
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm w-screen h-screen" onClick={handleClose}>
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-xl mx-4 bg-[#F3E8D6] rounded-3xl border-[1px] border-black shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 hover:opacity-70 transition-opacity"
          onClick={handleClose}
        >
          <XCircle size={24} className="text-black" />
        </button>
        {renderContent()}
      </div>
    </div>
  )
}
