import express from 'express'
import user from './user'
import auth from './auth'
import post from './post'
import apply from './apply'
import main from './main'

const router = express();

router.use('/auth', auth);
router.use('/user', user);
router.use('/post', post);
router.use('/apply', apply);
router.use('/main', main)

export default router;