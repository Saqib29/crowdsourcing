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
    res.send("<h1>I'm seller</h1>");
});



module.exports = router;