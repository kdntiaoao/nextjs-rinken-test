import { NextPage } from 'next'
import Link from 'next/link'
import { memo } from 'react'

import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { Container, PageHeading, MarkerHeading, PrimaryButton } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

const years = [2020, 2019, 2018, 2017, 2016, 2015]

// eslint-disable-next-line react/display-name
const HomePage: NextPage = memo(() => {
  return (
    <DefaultLayout title="臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h2">問題一覧</PageHeading>

          <div className="mt-12">
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {years.map((year) => (
                <li key={year}>
                  <MarkerHeading component="h3">
                    <span className="text-2xl">{year}</span>
                    <span className="ml-1 text-sm">年度</span>
                  </MarkerHeading>

                  <ul className="mt-4 overflow-hidden rounded border border-primary-400">
                    <li className="break-keep">
                      <Link href={`/${year}/am`}>
                        <PrimaryButton shape="square" endIcon={<ChevronRightIcon className="h-5 w-5" />}>
                          第{year - 1953}回 午前
                        </PrimaryButton>
                      </Link>
                    </li>
                    <li className="break-keep border-t border-t-primary-400">
                      <Link href={`/${year}/pm`}>
                        <PrimaryButton shape="square" endIcon={<ChevronRightIcon className="h-5 w-5" />}>
                          第{year - 1953}回 午後
                        </PrimaryButton>
                      </Link>
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
})

export default HomePage
