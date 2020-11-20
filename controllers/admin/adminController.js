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
	
	var user =   req.session.user;

	res.render('admin/index', {
		uname: user.username
	});
	
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

// Categories
router.get('/Categories', (req, res) => {
	// will be searched to the categories table
	// and show categories
	res.send('categories will be shown');
});


// add Categories
router.get('/addCategories', (req, res) => {
	res.render('admin/addCategories');
});

// Operation

router.get('/adminlist', (req, res) => {
	main_controll.get_all_admin((results) => {
		console.log(results);
	});
});

router.get('/buyerlist', (req, res) => {
	main_controll.get_all_buyer((results) => {
		console.log(results);
	});
});

router.get('/sellerlist', (req, res) => {
	main_controll.get_all_seller((results) => {
		console.log(results);
	});
});




router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('home/login');
});

module.exports = router;