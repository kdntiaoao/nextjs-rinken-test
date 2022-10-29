import { Container, Heading } from 'components/atoms'
import { DefaultLayout } from 'components/template/DefaultLayout'

const Home = () => {
  return (
    <DefaultLayout title="臨検テスト">
      <Container>
        <div className="py-8">
          <div className='mb-4'>
            <Heading component="h2">問題一覧</Heading>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Home
