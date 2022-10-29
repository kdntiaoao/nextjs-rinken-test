import { Container, PageHeading, MarkerHeading, IconOutlinedButton } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

const years = [2020, 2019, 2018, 2017, 2016, 2015]

const chevronRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

const Home = () => {
  return (
    <DefaultLayout title="臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h2">問題一覧</PageHeading>

          <div className="mt-8">
            <ul className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {years.map((year) => (
                <li key={year}>
                  <MarkerHeading component="h3">
                    <span className="text-2xl">{year}</span>
                    <span className="text-sm ml-1">年度</span>
                  </MarkerHeading>

                  <ul className="mt-4 grid grid-cols-2 gap-4">
                    <li className="break-keep">
                      <IconOutlinedButton icon={chevronRight}>
                        第{year - 1953}回<wbr />
                        午前
                      </IconOutlinedButton>
                    </li>
                    <li className="break-keep">
                      <IconOutlinedButton icon={chevronRight}>
                        第{year - 1953}回<wbr />
                        午後
                      </IconOutlinedButton>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Home
