import express from 'express'
import { validateToken } from '../controller/auth'
import { apply, hire } from '../controller/apply'
import exceptionHandler from '../util/exception/exception.handler'

const router = express()

router.post('/job', exceptionHandler(validateToken), exceptionHandler(hire))
router.post('/:postId', exceptionHandler(validateToken), exceptionHandler(apply))

export default router