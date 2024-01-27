import express from 'express'
import exceptionHandler from '../util/exception/exception.handler'
import { validateToken } from '../controller/auth'
import { getWorkerList } from '../controller/main'

const router = express()

router.get('/:postId', exceptionHandler(validateToken), exceptionHandler(getWorkerList))

export default router;