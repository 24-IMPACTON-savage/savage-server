import express from 'express'
import user from './user'
import auth from './auth'
import post from './post'

const router = express();

router.use('/auth', auth);
router.use('/user', user);
router.use('/post', post)

export default router;