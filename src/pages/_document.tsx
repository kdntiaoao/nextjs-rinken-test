import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#82bd69" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#345427" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
