const express           = require('express');
const msgModel			= require.main.require('./models/msgModel');
const main_controll		= require.main.require('./models/main_controll');
const post_workModel	= require.main.require('./models/post_workModel');
const sellersModel		= require.main.require('./models/sellersModel');


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

	var username = {
		name: user.full_name,
		uname: user.username
	};

	msgModel.msgCount(username, function(status){

		res.render('buyer/index', {
			msg: status.length,
			name: username
		});
		
	});	

});


//         User Profile Controller >>>>>>>>>>>>>>>>>>>>>>


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


//      Message Controller >>>>>>>>>>>>>>>>>>>>>>>>>>

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
			res.redirect('/buyer');
		}

		
	});
});



router.get('/message/:id', (req, res) => {

	var user_id = {id: req.params.id};
	var user =   req.session.user;

	sellersModel.getById(user_id, function(status) {
		res.render('buyer/seller_message', {fname: user.full_name, sender: status[0].name});
	})
	
});


router.post('/message/:id', (req, res)=>{
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
		
		if(status == false){
			res.redirect('/buyer/buyerController');
		}
		
	});
});


//            POST Controller>>>>>>>>>>>>>>>>>>>>>>>

router.get('/post', (req, res) => {
	var user =   req.session.user;

	var username = {
		id: user.id,
		fname: user.full_name
	};

	res.render('buyer/post_work', username);

});

router.get('/edit_post/:id', (req, res) => {
	
	var post_id = {id: req.params.id};

	post_workModel.getByPostId(post_id, function (status) {
		
		res.render('buyer/edit_post', {edit_post: status});
	});
});

router.post('/edit_post/:id', (req, res) => {
	
	var post_id = {id: req.params.id};
	var post = {
		title: req.body.title,
		status: req.body.status,
		post_body: req.body.post_body,
		amount: req.body.amount
	};

	post_workModel.postUpdate(post_id,post, function (status) {

		if(status == false){
			/*res.send('post updated....');*/
			res.redirect('/buyer/post_list');

		}	
	});
});

router.post('/post', (req, res) => {
	var post = {
		id: req.body.id,
		name: req.body.name,
		title: req.body.title,
		status: req.body.status,
		post_body: req.body.post_body,
		amount: req.body.amount
	};
	post_workModel.post_work(post,function(status){

		if(status == false){
			res.send('post submitted....');

		}

	});

});

router.get('/delete/:id', (req, res) => {
	
	var post_id = {id: req.params.id};

	post_workModel.getByPostId(post_id, function (status) {
		
		res.render('buyer/delete_post', {delete_post: status});
	});
});


router.post('/delete/:id', (req, res) => {
	
	var post_id = {id: req.params.id};

	post_workModel.postDelete(post_id, function (status) {
		console.log(status);

		if(status == false){
			/*res.send('post updated....');*/
			res.redirect('/buyer/post_list');

		}	
	});
});


router.get('/post_list', (req, res) => {

	var user =   req.session.user;

	var user_id = {
		id: user.id,
	};
	
	post_workModel.getAll(user_id,function(status){
		res.render('buyer/post_list', {posts: status});
	});

});


//     Seller Controller >>>>>>>>>>>>>>>>>>>>>

router.get('/sellers', (req, res) => {
	
	sellersModel.getAll(function(status){
		res.render('buyer/sellers', {sellers: status});
	});

});


//       Logout Controller >>>>>>>>>>>>>>>>


router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('home/login');
});


module.exports = router;