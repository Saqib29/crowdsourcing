const express 	= require('express');
const main_controll     = require.main.require('./models/main_controll');
const category	 		= require.main.require('./models/category');
const router 			= express.Router();

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
		// const user = {
		// 	id: result[0].id,
		// 	full_name: result[0].full_name,
		// 	username: result[0].username,
		// 	email: result[0].email,
		// 	contact: result[0].contact,
		// 	address: result[0].address,
		// 	user_roll: result[0].user_roll
		// };
		res.render('admin/profile', { user : result[0] });
	});
});


// profile edit
router.get('/edit_profile/:id', (req, res) => {
	main_controll.getById(req.params.id, (result) => {
		res.render('admin/edit_profile', result[0]);
	});
});
router.post('/edit_profile/:id', (req, res) => {
	main_controll.update(req.body, (status) => {
		console.log(status);
	});
});


// Add People
router.get('/addAdmin', (req, res) => {
	res.render('admin/addAdmin');
});

router.post('/addAdmin', (req, res) => {
	if(req.body.password == req.body.repassword){
		main_controll.insert(req.body, (status) => {
			if(status) {
				res.redirect('/admin/adminController');
			}
		});
		// console.log(req.body);
	} else {
		res.send(`<h1>Password doens't matched!</h2>`);
	}	
});

// Categories
router.get('/Categories', (req, res) => {
	
	category.getCategories((results) => {
		res.send(results);
	});
});
// add Catagories
router.get('/addCategories', (req, res) => {
	res.render('admin/addCategories');
});
router.post('/addCategories', (req, res) => {
	category.addCategory(req.body, (status) => {
		if(status){
			res.redirect('/admin/adminController');
		} else {
			res.send('<h1>Something went wrong!</h1>');
		}
	});
	// console.log(req.body);
});

// Operation

router.get('/adminlist', (req, res) => {
	main_controll.get_all_admin((results) => {
		console.log(results);
		res.render('admin/adminlist', { users: results });
	});
});

router.get('/buyerlist', (req, res) => {
	main_controll.get_all_buyer((results) => {
		
		console.log(results);
		res.render('admin/buyerlist', { users: results });
	});
});

router.get('/sellerlist', (req, res) => {
	main_controll.get_all_seller((results) => {
		console.log(results);
		res.render('admin/sellerlist', { users: results });
	});
});

router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('home/login');
});

module.exports = router;