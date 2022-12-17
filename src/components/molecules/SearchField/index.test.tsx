import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SearchField } from '.'

describe('SearchForm', () => {
  it('入力したテキストが送信されるか', async () => {
    let submittedText: string = ''

    const handleSubmit = ({ inputText }: { inputText: string }) => {
      submittedText = inputText
    }

    render(<SearchField onSubmit={handleSubmit} />)
    const text = 'staphylococcus'
    await userEvent.type(screen.getByRole('searchbox'), text)
    await userEvent.click(screen.getByRole('button'))
    expect(submittedText).toBe(text)
  })
})
