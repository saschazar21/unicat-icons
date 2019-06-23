const styles = `
  .icons {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr 1fr 1fr;
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
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  }
`;

module.exports = icons => `
import { withAmp } from 'next/amp';
import {
  ${icons.join(',\n')}
} from '../dist/index.es.min';

const IndexPage = () => (
  <>
    <article>
      <h1>Unicat icons</h1>
      <p>
        A simple collection.
      </p>
    </article>
    <section className="icons">
      ${icons.map((Icon, index) => `
        <div className = "icon-container" >
          <${Icon} key="${'icon-' + index}" className="icon" />
          <span className="icon-title">${Icon}</span>
        </div>
      `).join('\n')}
    </section>
    <style jsx>{\`${styles}\`}</style>
  </>
);

export default withAmp(IndexPage);
`;