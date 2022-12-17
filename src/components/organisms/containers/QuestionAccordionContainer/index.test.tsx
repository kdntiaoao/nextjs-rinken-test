import { MouseEvent, ReactNode } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QuestionAccordionContainer } from '.'

import { Question } from 'types/question'
import { Overwrite } from 'types/utils'

window.scrollTo = jest.fn()

describe('QuestionAccordionContainer', () => {
  it('アコーディオンが開いて閉じるか', async () => {
    const props: {
      answer: number[]
      question: Overwrite<Question, { question: ReactNode; options: ReactNode[] }>
      questionNumber: number
      selectedAnswer: number[]
      timeframe: 'am' | 'pm'
      year: string
      handleDeleteQuestion?: (
        // eslint-disable-next-line no-unused-vars
        event: MouseEvent<HTMLButtonElement>,
        // eslint-disable-next-line no-unused-vars
        year: string,
        // eslint-disable-next-line no-unused-vars
        timeframe: 'am' | 'pm',
        // eslint-disable-next-line no-unused-vars
        questionNumber: number
      ) => void
    } = {
      answer: [3],
      question: {
        num: 1,
        question: '臨床検査室の品質と能力に関する国際規格はどれか。',
        options: ['', '', '', '', ''],
        img: '',
      },
      questionNumber: 1,
      timeframe: 'am',
      year: '2021',
      selectedAnswer: [3],
      handleDeleteQuestion: jest.fn(),
    }

    render(<QuestionAccordionContainer {...props} />)
    // 閉じているときは選択肢が表示されていない
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
    await userEvent.click(screen.getByLabelText('アコーディオンを開く'))
    // 開いているときは選択肢が表示されている
    expect(screen.queryAllByRole('checkbox')).toHaveLength(5)
    await userEvent.click(screen.getByLabelText('アコーディオンを閉じる'))
    // 閉じているときは選択肢が表示されていない
    setTimeout(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
    }, 3000)
  })
})
