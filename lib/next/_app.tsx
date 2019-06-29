import React, { Fragment } from "react";
import App, { Container } from "next/app";
import Link from "next/link";

import pkg from "../package.json";
import paths from "./paths.json";

import "highlight.js/styles/a11y-dark.css";

export const getAuthor = () => {
  if (!pkg || !pkg.author) {
    return null;
  }

  if (typeof pkg.author === "string") {
    const result = pkg.author.match(/^[^<>\(\)]+/);
    if (result && result[0]) {
      return result[0].trim();
    }
    return null;
  }

  if (typeof pkg.author === "object") {
    return pkg.author.name;
  }

  return null;
};

declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

const Layout = ({ children = {}, ...otherProps }) => (
  <Fragment>
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
          margin: 0;
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
          color: #f8f8f8;
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
    <footer>
      <nav aria-labelledby="footer-navigation">
        <strong id="footer-navigation">Navigation:</strong>
        {paths && paths.length && (
          <ul>
            <li>
              <Link href="/">
                <a>Index</a>
              </Link>
            </li>
            {paths.map((p, i) => (
              <li key={`link-${p}-${i}`}>
                <Link href={`/${p}`}>
                  <a>{p}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <strong className="description">
        {pkg.name} v{pkg.version}
      </strong>
      {getAuthor() && (
        <small className="description">
          Copyright (c) {getAuthor()}, licensed under the{" "}
          {paths.indexOf("license") >= 0 ? (
            <Link href="/license">
              <a>{pkg.license}</a>
            </Link>
          ) : (
            <strong>pkg.license</strong>
          )}{" "}
          license.
        </small>
      )}
      <style jsx>{`
        footer {
          background: #2b2b2b;
          color: #f8f8f8;
          border-top: 4px solid darkgrey;
          padding: 2em;
        }

        nav {
          display: flex;
          flex-direction: column;
          line-height: 2em;
          max-width: 840px;
          margin: 0 auto;
        }

        ul {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }

        a {
          color: inherit;
          border-bottom: 1px solid transparent;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          padding: 0 0.25em;
        }

        a:hover,
        a:focus,
        a:visited {
          color: lightgrey;
          border-bottom-color: lightgrey;
        }

        a:focus {
          outline: 1px solid yellow;
          box-shadow: 0 0 10px -1px yellow;
        }

        .description {
          display: block;
          text-align: center;
          margin: 2em 1em auto;
        }

        @media screen and (min-width: 768px) {
          nav {
            flex-direction: row;
          }

          ul {
            display: flex;
            flex-wrap: wrap;
          }

          strong,
          li {
            margin-right: 1em;
          }
        }
      `}</style>
    </footer>
  </Fragment>
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
