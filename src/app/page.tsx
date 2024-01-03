import { Heading, LinkList, LinkListItem } from '@/components'
import questionData from '@/assets/json/question-data.json'

const years = questionData.map((q) => q.year)

export default function Home() {
  return (
    <>
      <Heading>問題一覧</Heading>

      <ul
        className="grid place-content-center gap-8"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        {years.map((year, index) => (
          <li key={index.toString()}>
            <h3>
              <span className="text-2xl">{year}</span>
              <span className="ml-1 text-sm">年度</span>
            </h3>

            <div className="mt-3">
              <LinkList>
                <LinkListItem href={`/${year}am`}>第{year - 1953}回 午前</LinkListItem>
                <hr className="border-primary-400" />
                <LinkListItem href={`/${year}pm`}>第{year - 1953}回 午後</LinkListItem>
              </LinkList>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
