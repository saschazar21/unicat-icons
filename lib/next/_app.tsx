import React from 'react';
import App, { Container } from 'next/app';

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
        <Component {...pageProps} />
      </Container>
    );
  }
}
