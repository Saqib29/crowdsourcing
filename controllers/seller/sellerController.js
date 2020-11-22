const express           = require('express');
const router            = express.Router();

router.get('*', (req, res, next) => {
	if(req.session.user == null) {
		res.redirect('/home/login');
	}
	else {
		next();
	}
});

router.get('/sellerController', (req, res) => {
    res.render('seller/index', { user : req.session.user });
});


router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('/home/login');
});

module.exports = router;