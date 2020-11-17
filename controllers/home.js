const express           = require('express');
const router            = express.Router();

// login
router.get('/login', (req, res) => {
    res.render('home/login');
});

router.post('/login', (req, res) => {

});

// registration
router.get('/registration', (req, res) => {
    res.render('home/registration');
});

router.post('/registration', (req, res) => {
    
});

module.exports = router;