const express 	= require('express');
const router 	= express.Router();

router.get('*', (req, res, next) => {
	if(req.session.user == null) {
		res.redirect('/home/login');
	}
	else {
		next();
	}
});

router.get('/adminController', (req, res)=>{
	
	res.render('admin/index');
	
});

router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('home/login');
});

module.exports = router;