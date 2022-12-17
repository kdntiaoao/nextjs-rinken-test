import { useState } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CheckBoxList } from '.'

describe('CheckBoxList', () => {
  it('選択肢を選択する、および解除することができるか', async () => {
    const TestComponent = () => {
      const answerIndex = [2]
      const options = ['ISO 9001', 'ISO 13485', 'ISO 15189', 'ISO 17025', 'ISO 22870']
      const orders = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5']
      const thinking = true
      const [selectedAnswer, setSelectedAnswer] = useState<number[]>([]) // 選択されている解答

      const changeSelect = (selectedIndex: number) => {
        if (!thinking) return

        const index = selectedAnswer.indexOf(selectedIndex)
        if (index < 0) {
          setSelectedAnswer((prev) => [...prev, selectedIndex].slice(-answerIndex.length))
        } else {
          setSelectedAnswer((prev) => prev.filter((answer) => answer !== selectedIndex))
        }
      }

      return (
        <CheckBoxList
          answer={answerIndex}
          options={options}
          orders={orders}
          selectedAnswer={selectedAnswer}
          thinking={thinking}
          handleChange={changeSelect}
        />
      )
    }

    render(<TestComponent />)
    const firstCheckBox = screen.getAllByRole('checkbox')[0]
    expect(firstCheckBox).not.toBeChecked()
    await userEvent.click(firstCheckBox)
    expect(firstCheckBox).toBeChecked()
    await userEvent.click(firstCheckBox)
    expect(firstCheckBox).not.toBeChecked()
  })

  it('選択肢が1つのとき、2つ以上選択されないか', async () => {
    const TestComponent = () => {
      const answerIndex = [2]
      const options = ['ISO 9001', 'ISO 13485', 'ISO 15189', 'ISO 17025', 'ISO 22870']
      const orders = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5']
      const thinking = true
      const [selectedAnswer, setSelectedAnswer] = useState<number[]>([]) // 選択されている解答

      const changeSelect = (selectedIndex: number) => {
        if (!thinking) return

        const index = selectedAnswer.indexOf(selectedIndex)
        if (index < 0) {
          setSelectedAnswer((prev) => [...prev, selectedIndex].slice(-answerIndex.length))
        } else {
          setSelectedAnswer((prev) => prev.filter((answer) => answer !== selectedIndex))
        }
      }

      return (
        <CheckBoxList
          answer={answerIndex}
          options={options}
          orders={orders}
          selectedAnswer={selectedAnswer}
          thinking={thinking}
          handleChange={changeSelect}
        />
      )
    }

    render(<TestComponent />)
    const firstCheckBox = screen.getAllByRole('checkbox')[0]
    const secondCheckBox = screen.getAllByRole('checkbox')[1]
    const thirdCheckBox = screen.getAllByRole('checkbox')[2]
    await userEvent.click(firstCheckBox)
    await userEvent.click(secondCheckBox)
    await userEvent.click(thirdCheckBox)
    expect(firstCheckBox).not.toBeChecked()
    expect(secondCheckBox).not.toBeChecked()
    expect(thirdCheckBox).toBeChecked()
  })

  it('選択肢が2つのとき、2つ選択することができるか', async () => {
    const TestComponent = () => {
      const answerIndex = [1, 4]
      const options = [
        '|R/Xbar| 管理法',
        'Xbar-R 管理図法',
        '項目間チェック法',
        'デルタチェック法',
        'マルチルール管理図法',
      ]
      const orders = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5']
      const thinking = true
      const [selectedAnswer, setSelectedAnswer] = useState<number[]>([]) // 選択されている解答

      const changeSelect = (selectedIndex: number) => {
        if (!thinking) return

        const index = selectedAnswer.indexOf(selectedIndex)
        if (index < 0) {
          setSelectedAnswer((prev) => [...prev, selectedIndex].slice(-answerIndex.length))
        } else {
          setSelectedAnswer((prev) => prev.filter((answer) => answer !== selectedIndex))
        }
      }

      return (
        <CheckBoxList
          answer={answerIndex}
          options={options}
          orders={orders}
          selectedAnswer={selectedAnswer}
          thinking={thinking}
          handleChange={changeSelect}
        />
      )
    }

    render(<TestComponent />)
    const firstCheckBox = screen.getAllByRole('checkbox')[0]
    const secondCheckBox = screen.getAllByRole('checkbox')[1]
    const thirdCheckBox = screen.getAllByRole('checkbox')[2]
    await userEvent.click(firstCheckBox)
    await userEvent.click(secondCheckBox)
    await userEvent.click(thirdCheckBox)
    expect(firstCheckBox).not.toBeChecked()
    expect(secondCheckBox).toBeChecked()
    expect(thirdCheckBox).toBeChecked()
  })
})
