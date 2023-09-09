import { Router } from 'express';

import { healthcheckRouter } from './GeneralSystem/healthcheck.routes';
import { authRouter } from './GeneralSystem/auth.routes';
import { tenantRouter } from './GeneralSystem/tenant.routes';

import { userRouter } from './DataBasic/user.routes';
import { demandsRouter } from './DataBasic/demands.routes';

const router = Router();

router.use('/v1', authRouter);
router.use('/v1/healthcheck', healthcheckRouter);
router.use('/v1', tenantRouter);

router.use('/v1', userRouter);
router.use('/v1', demandsRouter);

export { router }