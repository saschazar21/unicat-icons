const transformer = require('./transformer');

(async () => {
  try {
    await transformer()
      .then(() => console.log(`Target ${process.env.TARGET} successfully transpiled`));
  } catch (e) {
    console.error(e);
  }
})();
