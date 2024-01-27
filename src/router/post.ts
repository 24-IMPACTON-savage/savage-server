import express from 'express'
import { getPost, getPostList, writePost } from '../controller/post'
import { validateToken } from '../controller/auth';
import exceptionHandler from '../util/exception/exception.handler';

const router = express()

router.post('/write', exceptionHandler(validateToken), exceptionHandler(writePost))
router.get('/:postId', exceptionHandler(validateToken), exceptionHandler(getPost))
router.get('/', exceptionHandler(validateToken), exceptionHandler(getPostList))

export default router;