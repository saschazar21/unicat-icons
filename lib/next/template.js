module.exports = icons => `
import {
  ${icons.join(',\n')}
} from '../dist/index.es.min';

export default () => (
  <main>
    <article>
      <h1>Unicat icons</h1>
      <p>
        A simple collection.
      </p>
    </article>
    <section className="icons">
      ${icons.map((Icon, index) => `<${Icon} key="${'icon-' + index}" className="icon" />`).join('\n')}
    </section>
  </main>
);

`;