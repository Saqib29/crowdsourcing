const express           = require('express');
const main_controll     = require.main.require('./models/main_controll');
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
        repassword: req.body.repassword,
        email:      req.body.email,
        contact:    req.body.contact,
        address:    req.body.address,
        user_roll:  req.body.user_roll.toLowerCase()
    }
    
    if(user.password != user.repassword){
        res.render('home/registration_error');
    } else {
        main_controll.insert(user, (status) => {
            if(status) {
                res.redirect('/home/login');
            } else {
               res.render('home/wrong');
            }
        });
    }
});

module.exports = router;