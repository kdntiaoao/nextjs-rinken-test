import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memo, useEffect, useMemo } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { useAtomValue } from 'jotai'
import { Line } from 'react-chartjs-2'

import { authUserAtom } from 'atoms/authUserAtom'
import { Container, PageHeading } from 'components/atoms'
import { LoadingScreen } from 'components/molecules'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useHistory } from 'hooks'
import { timeframeToJapanese } from 'utils'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const options = {
  responsive: true,
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
}

// eslint-disable-next-line react/display-name
const HistoryPage: NextPage = memo(() => {
  const router = useRouter()
  const authUser = useAtomValue(authUserAtom)
  const { history, loading } = useHistory(authUser?.uid)

  const data = useMemo(() => {
    if (!history) {
      return {
        labels: [],
        datasets: [],
      }
    }
    const sortedHistory = Object.entries(history)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .slice(-5)
    // eslint-disable-next-line no-unused-vars
    const labels = sortedHistory.map(([_, val]) => {
      const year = val.id.split('_')[0]
      const timeframe = val.id.split('_')[1]
      const questionNumberSection = val.id.split('_')[2]
      return [`第${Number(year) - 1953}回${timeframeToJapanese(timeframe)}`, `${questionNumberSection}`]
    })

    // eslint-disable-next-line no-unused-vars
    const data = sortedHistory.map(([_, val]) => val.percent * 100)

    return {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data,
          borderColor: 'rgb(76, 132, 53)',
          backgroundColor: 'rgba(76, 132, 53, 0.5)',
        },
      ],
    }
  }, [history])

  useEffect(() => {
    if (authUser === null) {
      router.push('/login')
    }
  }, [authUser, router])

  if (typeof authUser === 'undefined' || loading) {
    return <LoadingScreen />
  }

  return (
    <DefaultLayout title="履歴 | 臨検テスト">
      <Container>
        <div className="py-10">
          <PageHeading component="h1">履歴</PageHeading>
          <div className="mt-20 overflow-x-auto">
            {history && Object.keys(history).length > 0 ? <Line options={options} data={data} /> : <p>データがありません</p>}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
})

export default HistoryPage
