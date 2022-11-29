import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
import { doc, setDoc } from 'firebase/firestore'
import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import * as Scroll from 'react-scroll'

import { db } from '../../../../../firebase/client'

import { questions } from 'assets/questions'
import { answeringAtom } from 'atoms/answeringAtom'
import { authUserAtom } from 'atoms/authUserAtom'
import { incorrectsAtom } from 'atoms/incorrectsAtom'
import { Container, LinkButton, PrimaryButton, SmallHeading } from 'components/atoms'
import { AnimateQuestion, ImageDialog, LoadingScreen, ResultIcon } from 'components/molecules'
import { CheckBoxListContainer } from 'components/organisms'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useSelectedAnswer } from 'hooks'
import { timeframeToJapanese } from 'utils'

type PageProps = {
  year: string
  timeframe: 'am' | 'pm'
  questionNumberSection: string
  questionData: typeof questions[keyof typeof questions]['questionData']
  answerData: number[][]
}

type PathsType = {
  params: {
    year: string
    timeframe: 'am' | 'pm'
    questionNumberSection: string
  }
}

const scroll = Scroll.animateScroll

// eslint-disable-next-line react/display-name
const QuestionNumberPage: NextPage<PageProps> = memo(
  ({ year, timeframe, questionNumberSection, questionData, answerData }: PageProps) => {
    const [answering, setAnswering] = useAtom(answeringAtom)
    const setIncorrects = useUpdateAtom(incorrectsAtom)
    const authUser = useAtomValue(authUserAtom)
    const router = useRouter()
    const [correct, setCorrect] = useState<boolean>(true)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false) // 画像ダイアログフラグ
    const [thinking, setThinking] = useState<boolean>(true)
    const currentQuestion = useMemo(
      () => answering && questionData[answering.currentNumber - answering.firstNumber],
      [answering, questionData]
    )
    const answerIndex = useMemo(
      () => answering && answerData[answering.currentNumber - answering.firstNumber].map((answer) => answer - 1),
      [answerData, answering]
    )
    const { selectedAnswer, changeSelect, resetSelect } = useSelectedAnswer(answerIndex?.length || 0, thinking)

    const checkAnswer = useCallback(
      (year: string, timeframe: 'am' | 'pm', questionNumber: number, selectedAnsswer: number[]) => {
        const sortedAnswer = selectedAnsswer.sort()
        const result = sortedAnswer.toString() === answerIndex?.toString()
        setAnswering((prev) => {
          if (!prev) {
            return prev
          }
          // 正解のとき
          if (result) {
            return {
              ...prev,
              correctCount: prev.correctCount + 1,
              selectedAnswers: [...prev.selectedAnswers, sortedAnswer],
            }
          }
          return { ...prev, selectedAnswers: [...prev.selectedAnswers, sortedAnswer] }
        })
        setCorrect(result)
        setThinking(false)
        // 不正解のとき
        if (!result) {
          setIncorrects((prev) =>
            prev
              ? [
                  // 間違えた問題がすでに保存されているときは、保存されているものを削除
                  ...prev.filter(
                    (question: { year: string; timeframe: 'am' | 'pm'; questionNumber: number }) =>
                      !(
                        question.year === year &&
                        question.timeframe === timeframe &&
                        question.questionNumber === questionNumber
                      )
                  ),
                  { year, timeframe, questionNumber, selectedAnswer },
                ]
              : [{ year, timeframe, questionNumber, selectedAnswer }]
          )
        }
      },
      [answerIndex, selectedAnswer, setAnswering, setIncorrects]
    )

    const handleNextQuestion = useCallback(async () => {
      // 最後の問題を解答したとき
      if (answering?.currentNumber === answering?.lastNumber) {
        if (answering && authUser?.uid) {
          // firestoreに結果を保存
          const percent = answering.correctCount / answering.selectedAnswers.length
          const timestamp = Date.now()
          const data = {
            [timestamp]: {
              id: `${year}_${timeframe}_${questionNumberSection}`,
              percent,
            },
          }
          await setDoc(doc(db, 'history', authUser.uid), data, { merge: true })
        }
        await router.push(`/${year}/${timeframe}/${questionNumberSection}/result`)
      }

      setDisabled(true)
      try {
        scroll.scrollToTop({ duration: 0 })
        setAnswering((prev) => prev && { ...prev, currentNumber: prev.currentNumber + 1 })
        setThinking(true)
        resetSelect()
      } finally {
        setDisabled(false)
      }
    }, [answering, authUser?.uid, questionNumberSection, resetSelect, router, setAnswering, timeframe, year])

    const handleOpenDialog = useCallback(() => setOpenDialog(true), [])

    const handleCloseDialog = useCallback(() => setOpenDialog(false), [])

    useEffect(() => {
      if (!answering) {
        return
      }
      // 最後の問題を解答したとき
      if (answering.currentNumber === answering.lastNumber) {
        router.push(`/${year}/${timeframe}/${questionNumberSection}/result`)
      }
      // 現在の問題番号と解答数が合わないとき
      if (answering.currentNumber !== answering.selectedAnswers.length + 1) {
        setAnswering((prev) => prev && { ...prev, currentNumber: prev.firstNumber + answering.selectedAnswers.length })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (!answering) {
        router.push(`/${year}/${timeframe}`)
      }
    }, [answering, router, timeframe, year])

    if (!answering) {
      return <LoadingScreen />
    }

    return (
      <DefaultLayout
        title={`第${Number(year) - 1953}回${timeframeToJapanese(timeframe)}${questionNumberSection} | 臨検テスト`}
      >
        <Container>
          <div className="py-10">
            <Link href={`/${year}/${timeframe}`}>
              <LinkButton reverse>
                第{Number(year) - 1953}回{timeframeToJapanese(timeframe)}
              </LinkButton>
            </Link>

            <div className="relative mt-8">
              <AnimateQuestion animateKey={answering?.currentNumber.toString()}>
                <SmallHeading>問題{answering?.currentNumber}</SmallHeading>
                <div className="mt-4">
                  <p>{currentQuestion?.question}</p>

                  {currentQuestion?.img && (
                    <button
                      type="button"
                      onClick={handleOpenDialog}
                      className="relative mx-auto mt-6 block w-fit cursor-zoom-in text-black/40 md:hover:text-black"
                    >
                      <Image
                        priority
                        width={200}
                        height={200}
                        src={`/images/${year}${timeframe}/${currentQuestion.img}.jpg`}
                        alt={`問題${answering?.currentNumber}の画像`}
                        className="w-auto"
                      />
                      <span className="absolute bottom-4 right-4">
                        {<MagnifyingGlassPlusIcon className="h-6 w-6" />}
                      </span>
                    </button>
                  )}

                  <div className="relative mt-6">
                    <div className="flex-1">
                      <CheckBoxListContainer
                        answer={answerIndex || []}
                        options={currentQuestion?.options || []}
                        selectedAnswer={selectedAnswer}
                        thinking={thinking}
                        handleChange={changeSelect}
                      />
                    </div>
                    {!thinking && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <ResultIcon correct={correct} />
                      </div>
                    )}
                  </div>

                  <div className="mt-10">
                    <PrimaryButton
                      color={thinking ? 'primary' : 'secondary'}
                      component="button"
                      disabled={disabled}
                      shape="rounded-full"
                      variant="contained"
                      onClick={() =>
                        thinking
                          ? checkAnswer(year, timeframe, answering?.currentNumber || 0, selectedAnswer)
                          : handleNextQuestion()
                      }
                    >
                      {thinking ? '解答する' : '次の問題へ'}
                    </PrimaryButton>
                  </div>
                </div>
              </AnimateQuestion>

              {openDialog && (
                <ImageDialog onClose={handleCloseDialog}>
                  <Image
                    fill
                    className="object-contain object-center"
                    src={`/images/${year}${timeframe}/${currentQuestion?.img}.jpg`}
                    alt={`問題${answering?.currentNumber}の画像`}
                  />
                </ImageDialog>
              )}
            </div>
          </div>
        </Container>
      </DefaultLayout>
    )
  }
)

export const getStaticPaths: GetStaticPaths = async () => {
  const years = ['2020', '2019', '2018', '2017', '2016', '2015']
  const timeframes: ['am', 'pm'] = ['am', 'pm']
  const questionNumberSections = [
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
      for (const questionNumberSection of questionNumberSections) {
        paths.push({ params: { year, timeframe, questionNumberSection } })
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
  const questionNumberSection = params?.questionNumberSection
  const firstNumber = Number(params?.questionNumberSection?.toString().split('-')[0])
  const lastNumber = Number(params?.questionNumberSection?.toString().split('-')[1])
  const questionData =
    year && timeframe && questions[`${year}${timeframe}`].questionData.slice(firstNumber - 1, lastNumber)
  const answerData = year && timeframe && questions[`${year}${timeframe}`].answerData.slice(firstNumber - 1, lastNumber)
  return {
    props: { year, timeframe, questionNumberSection, questionData, answerData },
  }
}

export default QuestionNumberPage
