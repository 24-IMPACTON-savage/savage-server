import express from 'express';
import exceptionHandler from '../exception/exception.handler';
import { signIn } from '../controller/auth';

const router = express();

router.post('/signin', exceptionHandler(signIn))

export default router;