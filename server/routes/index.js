import express from 'express';
import account from './account';
import memo from './memo';
import notification from './notification';
import coffee from './coffee';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

router.use('/account', account);
router.use('/memo', memo);
router.use('/notification', notification);
router.use('/coffee', coffee);

export default router;
