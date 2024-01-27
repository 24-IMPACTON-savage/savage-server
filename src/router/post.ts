import express from 'express'
import { writePost } from '../controller/post'
import { validateToken } from '../controller/auth';
import exceptionHandler from '../util/exception/exception.handler';

const router = express()

router.post('/write', validateToken, exceptionHandler(writePost))

export default router;