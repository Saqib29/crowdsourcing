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

});

module.exports = router;