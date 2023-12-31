import Link from 'next/link'
import { PageContents } from './_components/PageContents'
import questionData from '@/assets/json/question-data.json'
import questionSectionList from '@/assets/json/question-section-list.json'

type Props = {
  params: {
    yearTimeframe: string
    questionSection: string
  }
}

const getTitle = (yearTimeframe: string, questionSection: string): string => {
  const year = Number(yearTimeframe.slice(0, 4))
  const timeframe = yearTimeframe.slice(4)
  const number = year - 1953
  const timeframe2 = timeframe.toUpperCase()
  const questionSection2 = questionSection.replace('-', '〜')
  return `第${number}回${timeframe2} ${questionSection2}`
}

export async function generateStaticParams() {
  const paths = questionData.map((question) =>
    questionSectionList.map((section) => ({
      yearTimeframe: `${question.year}${question.timeframe}`,
      questionSection: `${section.from + 1}-${section.to + 1}`,
    })),
  )

  return paths
}

export async function generateMetadata({ params }: Props) {
  const title = getTitle(params.yearTimeframe, params.questionSection)

  return {
    title: `${title} | 臨検テスト`,
    description: `${title}の問題を解くことができます。`,
  }
}

export default function Page({ params }: Props) {
  const year = Number(params.yearTimeframe.slice(0, 4))
  const timeframe = params.yearTimeframe.slice(4)
  const title = getTitle(params.yearTimeframe, params.questionSection)
  const sectionFrom = Number(params.questionSection.split('-')[0]) - 1
  const sectionTo = Number(params.questionSection.split('-')[1]) - 1

  const currentQuestionData = questionData.find((item) => item.year === year && item.timeframe === timeframe)

  const currentQuestionList = currentQuestionData?.questionList.slice(sectionFrom, sectionTo + 1)

  const currentAnswerList = currentQuestionData?.answerList.slice(sectionFrom, sectionTo + 1)

  if (!currentQuestionList || !currentAnswerList) {
    return null
  }

  return (
    <>
      <Link href={`/${params.yearTimeframe}`}>&lt; {params.yearTimeframe}</Link>
      <PageContents
        yearTimeframe={params.yearTimeframe}
        questionSection={params.questionSection}
        title={title}
        currentQuestionList={currentQuestionList}
        currentAnswerList={currentAnswerList}
      />
    </>
  )
}
