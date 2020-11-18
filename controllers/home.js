const express           = require('express');
const router            = express.Router();

// login
router.get('/login', (req, res) => {
    res.render('home/login');
});

router.post('/login', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(user);
});

// registration
router.get('/registration', (req, res) => {
    res.render('home/registration');
});

router.post('/registration', (req, res) => {
    var user = {
        full_name:  req.body.full_name,
        username:   req.body.username,
        password:   req.body.password,
        email:      req.body.email,
        contact:    req.body.contact,
        address:    req.body.address,
        user_roll:  req.body.user_roll
    }
    console.log(user);
});

module.exports = router;