import React from "react";
import App, { Container } from "next/app";

import 'highlight.js/styles/a11y-dark.css';

declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

const Layout = ({ children = {}, ...otherProps }) => (
  <main {...otherProps}>
    {children}
    <style jsx global>{`
      html {
        font-size: 16px;
      }

      body {
        background-color: white;
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        line-height: 1.45;
        color: #333;
      }

      p {
        margin-bottom: 1.25em;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 2.75rem 0 1rem;
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        line-height: 1.15;
      }

      h1 {
        margin-top: 0;
        font-size: 3.052em;
      }

      h2 {
        font-size: 2.441em;
      }

      h3 {
        font-size: 1.953em;
      }

      h4 {
        font-size: 1.563em;
      }

      h5 {
        font-size: 1.25em;
      }

      small,
      code,
      .text_small {
        font-size: 0.8em;
      }

      code {
        -webkit-font-smoothing: antialiased;
        display: inline-block;
        font-family: "Fira Mono", monospace;
        border-radius: 4px;
        background-color: #2b2b2b;
        color: #f8f8f2;
        padding: 0.5em;
        margin: 0.25em;
      }

      pre {
        border-radius: 4px;
        background-color: #2b2b2b;
        padding: 1.25em;
        max-width: 100%;
        overflow: auto;
      }

      blockquote {
        background-color: #f8f8f8;
        border-left: 8px solid darkgrey;
        padding: 1.25em;
        margin: 1em 0 2em 0;
        line-height: 1.45em;
      }

      blockquote > * {
        margin: 0;
      }
    `}</style>
    <style jsx>{`
      main {
        padding: 2em;
        margin: 0 auto;
        max-width: 840px;
      }
    `}</style>
  </main>
);

export default class Unicat extends App {
  static async getInitialProps({ Component, ctx }) {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
