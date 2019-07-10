const pkg = require("../../package.json");

const styles = `
  article {
    padding: 1em 0;
    margin-bottom: 2em;
    border-bottom: 1px dashed darkgrey;
  }

  .icons {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    fill: darkgrey;
  }

  .icon-title {
    display: block;
    margin-top: 0.5em;
  }

  @media screen and (min-width: 768px) {
    .icons {
      grid-gap: 2em;
    }
  }
`;

module.exports = icons => `
import Link from 'next/link';
import {
  ${icons.join(",\n")}
} from '../dist/index.es.min';

const IndexPage = () => (
  <>
    <article>
      <h1>Unicat icons</h1>
      <p>
        A simple icon collection for <a href="https://reactjs.org/">React</a>, <a href="https://facebook.github.io/react-native/">React Native</a> and <a href="https://airbnb.io/react-sketchapp/">Airbnb's react-sketchapp</a>.
      </p>

      <h2>Usage</h2>
      <p>
        Usage is fairly simple, just import the desired icon as you would normally do for other React-based components:
      </p>
      <pre>
        <code className="language-jsx">
import &#123; ${icons.pop()} &#125; from '${pkg.name}';
        </code>
      </pre>
      <p>
        A more detailed manual is available in the <Link href="/readme"><a>README</a></Link>.
      </p>
    </article>
    <section className="icons">
      ${icons
        .map(
          (Icon, index) => `
        <div className = "icon-container" >
          <${Icon} key="${"icon-" +
            index}" className="icon" style={{ height: 'auto', width: 64 }} />
          <span className="icon-title">${Icon}</span>
        </div>
      `
        )
        .join("\n")}
    </section>
    <style jsx>{\`${styles}\`}</style>
  </>
);
export const config = { amp: true };
export default IndexPage;
`;
