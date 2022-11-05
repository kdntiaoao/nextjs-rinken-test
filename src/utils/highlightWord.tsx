import { Fragment, ReactNode } from 'react'

export const highlightWord = (text: string, word: string): ReactNode => {
  return (
    <>
      {text.split(word).map((t, index) => {
        if (index === 0) {
          return <Fragment key={index.toString()}>{t}</Fragment>
        } else {
          return (
            <Fragment key={index.toString()}>
              {<span className="bg-secondary-400/20">{word}</span>}
              {t}
            </Fragment>
          )
        }
      })}
    </>
  )
}
