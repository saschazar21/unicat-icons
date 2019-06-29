import Document, { Html, Head, Main, NextScript } from "next/document";

import pkg from "../package.json";
import { getAuthor } from "./_app";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    const author = getAuthor();

    return (
      <Html>
        <Head>
          <title>
            {pkg.name} {author && `by ${author}`}
          </title>
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Mono|Open+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
