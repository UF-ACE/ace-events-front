import Document, { Html, Head, Main, NextScript } from 'next/document'
import Nav from '../components/nav'

class Doc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/static/favicon.png" />
          <meta name="Description" content="The Association of Computer Engineers is a Professional Organization at the University of Florida that caters to Computer Science, Computer Engineering, and Electrical Engineering Majors." />
        </Head>
        <body>
          <Nav />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Doc