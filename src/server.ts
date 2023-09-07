import express from 'express';
import { router } from './presentation/routes/index';
import cors from 'cors';
import 'express-async-errors';
import { getEnv } from './infrastructure/config/env';

const app = express();
const port = getEnv().PORT ?? 8080; 

app.use(express.json({ limit: "15mb" }));

app.use(cors());

app.disable("x-powered-by");

app.use('/api', router);

app.get('/healthcheck', (req, res) => {
  res.send({
    status: 'ok'
  });
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
