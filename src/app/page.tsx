import Link from 'next/link'
import questionData from '@/assets/json/question-data.json'

const years = questionData.map((q) => q.year)

export default function Home() {
  return (
    <>
      <h2>問題一覧</h2>

      <div className="mt-12">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {years.map((year, index) => (
            <li key={index.toString()}>
              <h3>
                <span className="text-2xl">{year}</span>
                <span className="ml-1 text-sm">年度</span>
              </h3>

              <ul className="mt-4 overflow-hidden rounded border border-primary-400">
                <li className="break-keep">
                  <Link href={`/${year}am`}>第{year - 1953}回 午前</Link>
                </li>
                <li className="break-keep border-t border-t-primary-400">
                  <Link href={`/${year}pm`}>第{year - 1953}回 午後</Link>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
