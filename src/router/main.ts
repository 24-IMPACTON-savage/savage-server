import express from 'express'
import exceptionHandler from '../util/exception/exception.handler'
import { validateToken } from '../controller/auth'
import { getWorker, getWorkerList } from '../controller/main'

const router = express()

router.get('/worker', exceptionHandler(validateToken), exceptionHandler(getWorker))
router.get('/:postId', exceptionHandler(validateToken), exceptionHandler(getWorkerList))

export default router;