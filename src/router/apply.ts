import express from 'express'
import { validateToken } from '../controller/auth'
import { apply } from '../controller/apply'
import exceptionHandler from '../util/exception/exception.handler'

const router = express()

router.post('/:postId', exceptionHandler(validateToken), exceptionHandler(apply))

export default router