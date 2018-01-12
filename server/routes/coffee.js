import express from 'express';
import Coffee from '../models/coffee';
import Account from '../models/account';

const router = express.Router();

router.post('/buy', (req, res) => {

    let coffee = new Coffee({
        coffeeusername: req.body.coffeeusername,
        coffeename: req.body.coffeename,
        cost: req.body.cost
    });

    coffee.save( err => {
        if(err) throw err;
        return res.json({success: true});
    });

});

export default router;
