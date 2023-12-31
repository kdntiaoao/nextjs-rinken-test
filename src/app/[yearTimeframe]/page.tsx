import questionData from '@/assets/json/question-data.json'
import Link from 'next/link'

type Props = {
  params: {
    yearTimeframe: string
  }
}

export const questionSectionList = [
  {
    from: 0,
    to: 9,
  },
  {
    from: 10,
    to: 19,
  },
  {
    from: 20,
    to: 29,
  },
  {
    from: 30,
    to: 39,
  },
  {
    from: 40,
    to: 49,
  },
  {
    from: 50,
    to: 59,
  },
  {
    from: 60,
    to: 69,
  },
  {
    from: 70,
    to: 79,
  },
  {
    from: 80,
    to: 89,
  },
  {
    from: 90,
    to: 99,
  },
  {
    from: 0,
    to: 99,
  },
]

const getTitle = (yearTimeframe: string): string => {
  const year = Number(yearTimeframe.slice(0, 4))
  const timeframe = yearTimeframe.slice(4)
  return `第${year - 1953}回${timeframe.toUpperCase()}`
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
      <Link href="/">問題一覧へ</Link>

      <h1>{title}</h1>

      <div>
        <ul>
          {questionSectionList.map((section, index) => (
            <li key={index.toString()} className="break-keep">
              <Link href={`/${params.yearTimeframe}/${section.from + 1}-${section.to + 1}`}>
                {section.from + 1}〜{section.to + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
