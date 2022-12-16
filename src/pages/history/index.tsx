import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { format } from 'date-fns'
import { useAtomValue } from 'jotai'
import { Bar } from 'react-chartjs-2'

import { authUserAtom } from 'atoms/authUserAtom'
import { darkModeAtom } from 'atoms/darkModeAtom'
import { Container, PageHeading } from 'components/atoms'
import { LoadingScreen } from 'components/molecules'
import { DefaultLayout } from 'components/template/DefaultLayout'
import { useHistory } from 'hooks'
import { timeframeToJapanese } from 'utils'

ChartJS.register(CategoryScale, LinearScale, BarElement)

// eslint-disable-next-line react/display-name
const HistoryPage: NextPage = () => {
  const router = useRouter()
  const authUser = useAtomValue(authUserAtom)
  const { history, loading } = useHistory(authUser?.uid)
  const darkMode = useAtomValue(darkModeAtom)

  const options = useMemo(
    () => ({
      responsive: true,
      scales: {
        x: {
          border: { color: darkMode ? '#475569' : '#e5e7eb' },
          grid: { display: false },
        },
        y: {
          border: { color: darkMode ? '#475569' : '#e5e7eb' },
          grid: { color: darkMode ? '#475569' : '#e5e7eb' },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
          },
        },
      },
    }),
    [darkMode]
  )

  const data = useMemo(() => {
    if (!history) {
      return {
        labels: [],
        datasets: [],
      }
    }
    const sortedHistory = Object.entries(history).sort((a, b) => Number(a[0]) - Number(b[0]))
    // eslint-disable-next-line no-unused-vars
    const labels = sortedHistory.map((_) => '')

    // eslint-disable-next-line no-unused-vars
    const data = sortedHistory.map(([_, untypedVal]) => {
      const val = untypedVal as { id: string; percent: number }
      return val.percent * 100
    })

    return {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data,
          borderColor: 'rgb(76, 132, 53)',
          backgroundColor: 'rgba(76, 132, 53, 0.5)',
          maxBarThickness: 40,
        },
      ],
    }
  }, [history])

  const tableData = useMemo(() => {
    if (!history) {
      return []
    }
    const sortedHistory = Object.entries(history)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map((d) => {
        const copyAry = [...d]
        const year = copyAry[1].id.split('_')[0]
        const timeframe = copyAry[1].id.split('_')[1] as 'am' | 'pm'
        const questionNumberSection = copyAry[1].id.split('_')[2]
        copyAry[1].questionNumber = `第${Number(year) - 1953}回${timeframeToJapanese(
          timeframe
        )}${questionNumberSection}`
        return copyAry
      })
    return sortedHistory
  }, [history])

  useEffect(() => {
    if (authUser === null) {
      router.push('/accounts/login')
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
          <div className="mt-16 overflow-x-auto">
            {history && Object.keys(history).length > 0 ? (
              <>
                <Bar options={options} data={data} />
                <div className="mt-10">
                  <table className="mr-auto ml-auto w-full max-w-2xl table-fixed">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4"></th>
                        <th className="p-4">正答率 (%)</th>
                        <th className="p-4">解答時刻</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((d) => (
                        <tr key={d[0]} className="border-b">
                          <td className="p-4 text-left">{d[1].questionNumber}</td>
                          <td className="p-4 text-center">{d[1].percent * 100}</td>
                          <td className="p-4 text-center">{format(Number(d[0]), 'MM/dd HH:mm')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p>データがありません</p>
            )}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default HistoryPage
