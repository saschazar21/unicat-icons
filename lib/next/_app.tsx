import React from 'react';
import App, { Container } from 'next/app';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

const Layout = ({ children = {}, ...otherProps }) => (
  <main {...otherProps}>
    {children}
    <style jsx global>{`
      body {
        font-family: 'Open Sans';
        font-size: 16px;
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
