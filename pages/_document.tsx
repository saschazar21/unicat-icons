import React from 'react';
import Document, { Html, Head, Main, NextScript, NextDocumentContext } from 'next/document';

export default class CustomLayout extends Document<any> {
  static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    // TODO: add custom logic here
    return {...initialProps};
  }

  public render() {
    return (
      <Html>
        <Head>
          <style type="text/css">{`
            body {
              max-width: 840px;
              margin: 0 auto;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
