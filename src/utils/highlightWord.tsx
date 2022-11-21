import { Fragment, ReactNode } from 'react'

/**
 * 対象の文字列のみをハイライトする関数
 * @param text ハイライトしたい文字列の入ったテキスト
 * @param word ハイライトする対象文字列
 * @returns ハイライトしたテキスト
 */
export const highlightWord = (text: string, word: string): ReactNode => {
  const regex = new RegExp(word, 'i')
  const found = text.match(regex)

  return (
    <>
      {text.split(regex).map((t, index) => {
        if (index === 0) {
          return <Fragment key={index.toString()}>{t}</Fragment>
        } else {
          return (
            <Fragment key={index.toString()}>
              {<span className="bg-secondary-100 dark:bg-secondary-600">{found?.splice(0, 1)}</span>}
              {t}
            </Fragment>
          )
        }
      })}
    </>
  )
}
