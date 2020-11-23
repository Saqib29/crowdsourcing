const express 	= require('express');
const main_controll     = require.main.require('./models/main_controll');
const category	 		= require.main.require('./models/category');
const operation 		= require.main.require('./models/admioperation');
const msgModel			= require.main.require('./models/msgModel');
const router 			= express.Router();

router.get('*', (req, res, next) => {
	if(req.session.user == null) {
		res.redirect('/home/login');
	}
	else {
		next();
	}
});

router.get('/adminController', (req, res) => {
	var user =   req.session.user;

	var username = {
		name: user.full_name,
		uname: user.username,
		email: user.email,
		status: 'unread'
	};

	msgModel.msgCount(username, function(status){
		msgModel.emailCount(username, function(result){
			req.session.data = {
				msg_count: status.length,
				email_count: result.length,
				msg: status,
				email:result
			};

			res.render('admin/index', {
				email: result, 
				email_count: result.length,
				msg: status, 
				msg_count: status.length,
				user: username});
		});	
	});
});

//  admin search opearation
router.post('/search', (req, res) => {
	console.log(req.body);
	main_controll.search(req.body.search, (results) => {
		res.json({
			result : results
		});
	});
	// console.log('search');
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
		res.render('admin/categories', {users: results});
	});
});

router.get('/categories/delete/:id', (req, res) => {
	main_controll.delete_category(req.params.id, (status) => {
		res.redirect('/admin/Categories');
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
		console.log(req.session.data.email_count);

		res.render('admin/adminlist', {
				email: req.session.data.email, 
				email_count: req.session.data.email_count,
				msg: req.session.data.msg, 
				msg_count: req.session.data.msg_count,
				users: results,
				uname: req.session.user.username,
				name: req.session.user.name,
				email: req.session.user.email
			});
	});
});
router.get('/adminlist/delete/:id', (req, res) => {
	operation.delete_admin(req.params.id, (status) => {
		if(status) {
			res.redirect('/admin/adminlist');
		} else {
			res.redirect('/admin/adminlist');
		}
	});
	// console.log(req.params.id);
});

router.get('/buyerlist', (req, res) => {
	main_controll.get_all_buyer((results) => {
		// console.log(results);
		res.render('admin/buyerlist', { users: results });
	});
});
router.get('/buyerlist/delete/:id', (req, res) => {
	operation.delete_buyer(req.params.id, (status) => {
		if(status) {
			res.redirect('/admin/buyerlist');
		} else {
			res.redirect('/admin/buyerlist');
		}
	});
	// console.log(req.params.id);
});

router.get('/sellerlist', (req, res) => {
	main_controll.get_all_seller((results) => {
		// console.log(results);
		res.render('admin/sellerlist', { users: results });
	});
});
router.get('/sellerlist/delete/:id', (req, res) => {
	operation.delete_seller(req.params.id, (status) => {
		if(status) {
			res.redirect('/admin/sellerlist');
		} else {
			res.redirect('/admin/sellerlist');
		}
	});
	// console.log(req.params.id);
});

// reset password
router.get('/resetpassword', (req, res) => {
	res.render('admin/resetpassword');
});
router.post('/resetpassword', (req, res) => {
	if(req.body.password == req.body.repassword) {
		var set = {
			id: req.session.user.id,
			password: req.body.password
		}
		main_controll.resetPassword(set, (status) => {
			res.redirect('/admin/adminController');
		});
	}
	else{
		res.send('<h1>Password not matched!</h1>');
	}
});

router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('home/login');
});

module.exports = router;