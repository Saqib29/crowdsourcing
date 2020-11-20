const express           = require('express');
const msgModel	= require.main.require('./models/msgModel');
const main_controll	= require.main.require('./models/main_controll');

const router            = express.Router();

router.get('*', (req, res, next) => {
	if(req.session.user == null) {
		res.redirect('/home/login');
	}
	else {
		next();
	}
});

router.get('/buyerController', (req, res) => {
	var user =   req.session.user;

	res.render('buyer/index', {
		uname: user.username
	});
});

router.get('/profile', (req, res) => {
	var user =   req.session.user;
	var profile = {
		id: user.id,
		full_name: user.full_name,
		username: user.username,
		password: user.password,
		email: user.email,
		contact: user.contact,
		address: user.address
	};

	res.render('buyer/profile', profile);
});

router.get('/edit_profile/:username', (req, res) => {
	var user =   req.session.user;
	var profile = {
		id: user.id,
		full_name: user.full_name,
		username: user.username,
		password: user.password,
		email: user.email,
		contact: user.contact,
		address: user.address
	};

	res.render('buyer/edit_profile', profile);
});

router.post('/edit_profile/:username', (req, res)=>{
	var edit_profile = {
		id: req.body.id,
		full_name: req.body.full_name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		contact: req.body.contact,
		address: req.body.address

	};

	main_controll.buyer_profileUpdate(edit_profile, function(status){
		//console.log(status);
		
		if(status == true){
			res.send('Your profile is updated....');

		}
		
	});
});

router.get('/message', (req, res) => {
	var user =   req.session.user;

	res.render('buyer/message',{fname: user.full_name});
});


router.post('/message', (req, res)=>{
	var user =   req.session.user;
	var username= {
		uname: user.username
	};
	var send_message = {
		sender: req.body.sender,
		receiver: req.body.receiver,
		subject: req.body.subject,
		body: req.body.body,
	};

	msgModel.send_message(username,send_message, function(status){
		//console.log(status);
		
		if(status == false){
			res.send('message send....');

		}
		
	});
});

router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('home/login');
});


module.exports = router;