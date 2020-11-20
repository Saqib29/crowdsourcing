const express 	= require('express');
const main_controll     = require.main.require('./models/main_controll');
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

// profile
router.get('/profile', (req, res) => {
	main_controll.getById(req.session.user.id, (result) => {
		res.send(result); // --->>>
	});
});

// Add People
router.get('/addAdmin', (req, res) => {
	res.render('admin/addAdmin');
});


// add Categories
router.get('/addCategories', (req, res) => {
	res.render('admin/addCategories');
});







router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('home/login');
});

module.exports = router;