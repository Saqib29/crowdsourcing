const express           = require('express');
const operation 		= require.main.require('./models/selleroperation');
const main_controll		= require.main.require('./models/main_controll');
const router            = express.Router();
const upload			= require('express-fileupload');
const app 				= express();

app.use(upload());


router.get('*', (req, res, next) => {
	if(req.session.user == null) {
		res.redirect('/home/login');
	}
	else {
		next();
	}
});


// index/deshboard router
router.get('/sellerController', (req, res) => {
    res.render('seller/index', { user : req.session.user });
});

// profile router
router.get('/profile', (req, res) => {
	res.render('seller/profile', { profile : req.session.user });
});

// file upload
router.post('/fileupload', (req, res) => {
	console.log(req.files);
});

// edit_profile
router.get('/edit_profile/:id', (req, res) => {
	res.render('seller/edit_profile', { user : req.session.user });
});

router.post('/edit_profile/:id', (req, res) => {
	var user = {
		id: req.params.id,
		full_name: req.body.full_name,
		username: req.body.username,
		email: req.body.email,
		contact: req.body.contact,
		address: req.body.address
	  }
	operation.update(user, (status) => {
		if(status) {
			res.redirect('/seller/profile');
		} else {
			res.send('<a href="">Try Again</a>');
		}
	});
	// console.log(req.body);
});

// All posts router
router.get('/allpost', (req, res) => {
	operation.get_all_posts((results) => {
		res.render('seller/allposts', { posts : results });
	});
	
});

// sent messages
router.get('/se_messages/:username', (req, res) => {
	operation.get_sent_messages(req.params.username, (results) => {
		res.render('seller/messages', { messages : results, title : 'Sent messages' });
	});
});

// recieved messages
router.get('/re_messages/:username', (req, res) => {
	operation.get_recieved_messages(req.params.username, (results) => {
		res.render('seller/messages', { messages : results, title : 'Recieved messages' });
	});
});

//  sellers project history
router.get('/history/:id', (req, res) => {
	operation.get_history(req.params.id, (results) => {
		res.render('seller/history', { histories : results, name: req.session.user.username });
		// console.log(results);
	});
	// res.send(req.params.id);
});

// transaction
router.get('/transaction/:id', (req, res) => {
	operation.get_accounts(req.params.id, (result) => {
		res.render('seller/transaction', { record : result[0] });
	});
	// console.log(req.params.id);
});

//     reset password
router.get('/resetpassword', (req, res) => {
	res.render('seller/resetpassword');
});
router.post('/resetpassword', (req, res) => {
	if(req.body.password == req.body.repassword) {
		var set = {
			id: req.session.user.id,
			password: req.body.password
		}
		main_controll.resetPassword(set, (status) => {
			req.session.user = null;
			res.redirect('/home/login');
		});
	}
	else{
		res.send('<h1>Password not matched!</h1>');
	}
});

// message
router.get('/message/:id', (req, res) => {
	main_controll.getById(req.params.id, (result) => {
		var msg = {
			sender: req.session.user.email,
			reciever: result[0].email 
		}
		res.render('seller/sendmessage', { msg : msg });
		console.log(result);
	});
	// console.log(req.params.id);
	
});


// logout router
router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('/home/login');
});

module.exports = router;