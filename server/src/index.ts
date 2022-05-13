import express from 'express';

const main = async () => {
  const app = express();

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
};

main().catch((err) => {
  console.error(err);
});
