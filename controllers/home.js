const express           = require('express');
const main_controll     = require.main.require('./models/main_controll');
const router            = express.Router();

// login
router.get('/login', (req, res) => {
    // req.session.user = null;

    if(req.session.user != null) {
        if(req.session.user.user_roll.toLowerCase() == 'admin') {
            res.redirect('/admin/adminController');
        } 
        else if(req.session.user.user_roll.toLowerCase() == 'buyer') {
            res.redirect('/buyer/buyerController');
        } 
        else if (req.session.user.user_roll.toLowerCase() == 'seller') {
            res.redirect('/seller/sellerController');
        }
    } 
    else {
        res.render('home/login');
    }

});

router.post('/login', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password
    }

    // validatting if the person existed on database
    main_controll.validate(user, (status) => {

        // if user exist in database, go ahead
        if(status) {
            
            // getting logined persons basic informations
            main_controll.get_user(user, (result) => {

                // session stored of logger
                req.session.user = {
                    id        : result[0].id,
                    full_name : result[0].full_name,
                    username  : result[0].username,
                    password  : result[0].password,
                    email     : result[0].email,
                    contact   : result[0].contact,
                    address   : result[0].address,
                    user_roll : result[0].user_roll
                };

                // checking if the user admin or buyer or seller
                if(result[0].user_roll.toLowerCase() == 'admin') {
                    res.redirect('/admin/adminController');
                } 
                else if(result[0].user_roll.toLowerCase() == 'buyer') {
                    res.redirect('/buyer/buyerController');
                } 
                else if (result[0].user_roll.toLowerCase() == 'seller') {
                    res.redirect('/seller/sellerController');
                }

            });
        } else {
            res.render('home/not_register');
        }

    });
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

// logout
router.get('/logout', (req, res) => {
    res.session.user = null;
    res.redirect('/home/login');
});

module.exports = router;