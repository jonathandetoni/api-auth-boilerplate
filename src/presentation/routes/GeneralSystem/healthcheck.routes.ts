import {Request, Response, Router} from 'express';

export const healthcheckRouter = Router();

healthcheckRouter.get('/', (_req: Request, res: Response) => {
  try {
    res.status(200).send({status: "ok"});
  } catch (e) {
    res.status(500).send();
  }
});

