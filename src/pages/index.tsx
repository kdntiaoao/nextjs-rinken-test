import { Container, PageHeading } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

const Home = () => {
  return (
    <DefaultLayout title="臨検テスト">
      <Container>
        <div className="py-8">
          <div className='mb-4'>
            <PageHeading component="h2">問題一覧</PageHeading>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Home
