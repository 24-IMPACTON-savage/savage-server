import express from 'express';
import user from '../controller/user'
import exceptionHandler from '../exception/exception.handler';

const router = express();

router.post('/senior', exceptionHandler(user.signUpSenior));
router.post('/worker', exceptionHandler(user.signUpWorker));

export default router;