import Link from 'next/link'
import questionData from '@/assets/json/question-data.json'
import questionSectionList from '@/assets/json/question-section-list.json'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { Heading } from '@/components/Heading'

type Props = {
  params: {
    yearTimeframe: string
  }
}

const getTitle = (yearTimeframe: string): string => {
  const year = Number(yearTimeframe.slice(0, 4))
  const timeframe = yearTimeframe.slice(4) === 'am' ? '午前' : '午後'
  return `第${year - 1953}回 ${timeframe}`
}

export const generateStaticParams = async () => {
  const paths = questionData.map((question) => ({
    yearTimeframe: `${question.year}${question.timeframe}`,
  }))
  return paths
}

export const generateMetadata = async ({ params }: Props) => {
  const title = getTitle(params.yearTimeframe)

  return {
    title: `${title} | 臨検テスト`,
    description: `${title}の問題を解くことができます。`,
  }
}

export default function Page({ params }: Props) {
  const title = getTitle(params.yearTimeframe)

  return (
    <>
      <Link href="/" className="flex items-center">
        <ChevronLeftIcon className="h-6 w-6" />
        問題一覧へ
      </Link>

      <Heading>{title}</Heading>

      <ul
        className="grid place-content-center gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        }}
      >
        {questionSectionList.map((section, index) => (
          <li key={index.toString()} className="break-keep">
            <Link
              href={`/${params.yearTimeframe}/${section.from + 1}-${section.to + 1}`}
              className="block rounded bg-primary-600 px-4 py-2 text-center"
            >
              {section.from + 1}〜{section.to + 1}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
