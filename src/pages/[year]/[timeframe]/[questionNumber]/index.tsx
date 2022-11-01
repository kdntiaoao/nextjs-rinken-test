import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useCallback, useMemo, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import * as Scroll from 'react-scroll'

import { questions } from 'assets/questions'
import { Container, LinkButton, PrimaryButton, SmallHeading } from 'components/atoms'
import { ImageDialog, ResultIcon } from 'components/molecules'
import { CheckBoxListContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'

type PageProps = {
  year: string
  timeframe: 'am' | 'pm'
  questionNumber: string
  questionData: typeof questions[keyof typeof questions]
}

type PathsType = {
  params: {
    year: string
    timeframe: 'am' | 'pm'
    questionNumber: string
  }
}

const scroll = Scroll.animateScroll

const checkCircle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const arrowRightCircle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const magnifyingGlassPlus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
    />
  </svg>
)

// eslint-disable-next-line react/display-name
const TimeframePage: NextPage<PageProps> = memo(({ year, timeframe, questionNumber, questionData }: PageProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>(Number(questionNumber.split('-')[0])) // 現在解答中の問題番号
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]) // 選択されている解答
  const [thinking, setThinking] = useState<boolean>(true) // 解答中はtrue, 答え合わせ中はfalse
  const [correct, setCorrect] = useState<boolean>(true) // 正誤フラグ
  const [openDialog, setOpenDialog] = useState<boolean>(false) // 画像ダイアログフラグ

  const timeframeToJapanese = useMemo(() => (timeframe === 'am' ? '午前' : '午後'), [timeframe])
  const currentQuestion = useMemo(() => questionData.questionData[currentNumber - 1], [currentNumber, questionData])
  const answers = useMemo(
    () => questionData.answerData[currentNumber - 1].map((answer) => answer - 1),
    [currentNumber, questionData.answerData]
  )

  const handleChange = useCallback(
    (selectedIndex: number) => {
      if (!thinking) return

      const index = selectedAnswers.indexOf(selectedIndex)
      if (index < 0) {
        const answerLength = answers.length
        setSelectedAnswers((prev) => [...prev, selectedIndex].slice(-answerLength))
      } else {
        setSelectedAnswers((prev) => prev.filter((answer) => answer !== selectedIndex))
      }
    },
    [answers.length, selectedAnswers, thinking]
  )

  const handleAnswer = useCallback(() => {
    const sortedAnswers = selectedAnswers.sort()
    for (let i = 0; i < answers.length; i++) {
      if (sortedAnswers[i] !== answers[i]) {
        setCorrect(false)
        break
      }
      setCorrect(true)
    }
    setThinking(false)
  }, [answers, selectedAnswers])

  const handleNextQuestion = useCallback(() => {
    scroll.scrollToTop({ duration: 0 })
    setCurrentNumber((current) => current + 1)
    setThinking(true)
    setSelectedAnswers([])
  }, [])

  const handleOpenDialog = useCallback(() => setOpenDialog(true), [])

  const handleCloseDialog = useCallback(() => setOpenDialog(false), [])

  return (
    <DefaultLayout title={`${questionNumber} | 臨検テスト`}>
      <Container>
        <div className="py-10">
          <Link href={`/${year}/${timeframe}`}>
            <LinkButton reverse>
              第{Number(year) - 1953}回{timeframeToJapanese}
            </LinkButton>
          </Link>

          <div className="mt-6 relative">
            <AnimatePresence>
              <motion.div
                layout
                key={currentNumber}
                initial={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }}
                animate={{ opacity: 1, x: 0, position: 'relative' }}
                exit={{ x: '-100vw', position: 'absolute', zIndex: 1 }}
                transition={{ duration: 1 }}
              >
                <SmallHeading>問題{currentNumber}</SmallHeading>
                <div className="mt-4">
                  <p>{currentQuestion.question}</p>

                  {currentQuestion.img && (
                    <>
                      <button
                        type="button"
                        onClick={handleOpenDialog}
                        className="block mt-6 mx-auto w-fit relative text-black/40 hover:text-black "
                      >
                        <Image
                          priority
                          width={200}
                          height={200}
                          src={`/images/${year}${timeframe}/${currentQuestion.img}.jpg`}
                          alt={`問題${currentNumber}の画像`}
                          className="w-auto"
                        />
                        <span className="absolute bottom-4 right-4">{magnifyingGlassPlus}</span>
                      </button>
                      {openDialog && (
                        <ImageDialog onClose={handleCloseDialog}>
                          <Image
                            fill
                            className="object-contain object-center"
                            src={`/images/${year}${timeframe}/${currentQuestion.img}.jpg`}
                            alt={`問題${currentNumber}の画像`}
                          />
                        </ImageDialog>
                      )}
                    </>
                  )}

                  <div className="mt-6 relative">
                    <div className="flex-1">
                      <CheckBoxListContainer
                        answers={answers}
                        options={currentQuestion.options}
                        selectedAnswers={selectedAnswers}
                        thinking={thinking}
                        handleChange={handleChange}
                      />
                    </div>
                    {!thinking && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <ResultIcon correct={correct} />
                      </div>
                    )}
                  </div>

                  <div className="mt-10">
                    {thinking ? (
                      <PrimaryButton component="button" icon={checkCircle} onClick={handleAnswer}>
                        解答する
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton component="button" icon={arrowRightCircle} onClick={handleNextQuestion}>
                        次の問題へ
                      </PrimaryButton>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2020', '2019', '2018', '2017', '2016', '2015']
  const timeframes: ['am', 'pm'] = ['am', 'pm']
  const questionNumbers = [
    '1-10',
    '11-20',
    '21-30',
    '31-40',
    '41-50',
    '51-60',
    '61-70',
    '71-80',
    '81-90',
    '91-100',
    '1-100',
  ]
  const paths: PathsType[] = []
  for (const year of years) {
    for (const timeframe of timeframes) {
      for (const questionNumber of questionNumbers) {
        paths.push({ params: { year, timeframe, questionNumber } })
      }
    }
  }
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const year = params?.year as '2020' | '2019' | '2018' | '2017' | '2016' | '2015' | undefined
  const timeframe = params?.timeframe as 'am' | 'pm' | undefined
  const questionNumber = params?.questionNumber
  const questionData = year && timeframe && questions[`${year}${timeframe}`]
  return {
    props: { year, timeframe, questionNumber, questionData },
  }
}

export default TimeframePage
