import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
const QuestionNumberPage: NextPage<PageProps> = memo(({ year, timeframe, questionNumber, questionData }: PageProps) => {
  const router = useRouter()
  const [currentNumber, setCurrentNumber] = useState<number>(Number(questionNumber.split('-')[0])) // 現在解答中の問題番号
  const [selectedAnswer, setSelectedAnswer] = useState<number[]>([]) // 選択されている解答
  const [thinking, setThinking] = useState<boolean>(true) // 解答中はtrue, 答え合わせ中はfalse
  const [correct, setCorrect] = useState<boolean>(true) // 正誤フラグ
  const [openDialog, setOpenDialog] = useState<boolean>(false) // 画像ダイアログフラグ
  const [history, setHistory] = useState<{ selectedAnswers: string[]; correctCount: number }>({
    selectedAnswers: [],
    correctCount: 0,
  })

  const timeframeToJapanese = useMemo(() => (timeframe === 'am' ? '午前' : '午後'), [timeframe])
  const currentQuestion = useMemo(() => questionData.questionData[currentNumber - 1], [currentNumber, questionData])
  const endNumber = useMemo(() => Number(questionNumber.split('-')[1]), [questionNumber])
  const answer = useMemo(
    () => questionData.answerData[currentNumber - 1].map((answer) => answer - 1),
    [currentNumber, questionData.answerData]
  )

  const handleChange = useCallback(
    (selectedIndex: number) => {
      if (!thinking) return

      const index = selectedAnswer.indexOf(selectedIndex)
      if (index < 0) {
        const answerLength = answer.length
        setSelectedAnswer((prev) => [...prev, selectedIndex].slice(-answerLength))
      } else {
        setSelectedAnswer((prev) => prev.filter((answer) => answer !== selectedIndex))
      }
    },
    [answer.length, selectedAnswer, thinking]
  )

  const handleAnswer = useCallback(() => {
    const sortedAnswer = selectedAnswer.sort()
    const result = sortedAnswer.toString() === answer.toString()
    setCorrect(result)
    setHistory(({ selectedAnswers, correctCount }) => ({
      selectedAnswers: [...selectedAnswers, sortedAnswer.join(',')],
      correctCount: result ? correctCount + 1 : correctCount,
    }))

    setThinking(false)
  }, [answer, selectedAnswer])

  const handleNextQuestion = useCallback(() => {
    if (currentNumber >= endNumber) {
      router.push(
        {
          pathname: `/${year}/${timeframe}/${questionNumber}/result`,
          query: { selectedAnswers: history.selectedAnswers, correctCount: history.correctCount.toString() },
        },
        `/${year}/${timeframe}/${questionNumber}/result`
      )
      return
    }

    scroll.scrollToTop({ duration: 0 })
    setCurrentNumber((current) => current + 1)
    setThinking(true)
    setSelectedAnswer([])
  }, [currentNumber, endNumber, history.correctCount, history.selectedAnswers, questionNumber, router, timeframe, year])

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
                exit={{ x: '-100vw', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}
                transition={{ duration: 1 }}
                className="bg-white"
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
                        answer={answer}
                        options={currentQuestion.options}
                        selectedAnswer={selectedAnswer}
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
                      <PrimaryButton component="button" onClick={handleAnswer}>
                        解答する
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton color="secondary" component="button" onClick={handleNextQuestion}>
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

export default QuestionNumberPage
