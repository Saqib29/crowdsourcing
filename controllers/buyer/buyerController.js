const express           = require('express');
const nodemailer 		= require('nodemailer');
const { check, validationResult } = require('express-validator');
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
		uname: user.username,
		email: user.email,
		status: 'unread'
	};

	main_controll.get_all_users((all_users) => {
		main_controll.get_all_seller((all_selers) => {
			main_controll.get_all_category((all_category) => {
				post_workModel.get_postBY_buyerId(req.session.user.id, (own_post) => {
					var overview = {
						users: all_users.length,
						sellers: all_selers.length,
						category: all_category.length,
						own_post: own_post.length
					};

					msgModel.msgCount(username, function(status){
						msgModel.emailCount(username, function(result){
							req.session.data = {
								msg_count: status.length,
								email_count: result.length,
								msg: status,
								email:result
							};
				
							res.render('buyer/index', {
								email: result, 
								email_count: result.length,
								msg: status, 
								msg_count: status.length,
								user: username,
								overview: overview
							});
						});	
					});

				});


			});
		});
	});

	
});


// search_seller
router.post('/search', (req, res) => {
	main_controll.search_seller(req.body.search, (result) => {
		console.log(result)
		res.json({
			result : result
		});
	});
	// console.log(req.body);
});



//         User Profile Controller >>>>>>>>>>>>>>>>>>>>>>


router.get('/profile', (req, res) => {
	res.render('buyer/profile', {
				email: req.session.data.email, 
				email_count: req.session.data.email_count,
				msg: req.session.data.msg, 
				msg_count: req.session.data.msg_count,
				profile: req.session.user});
	
});


router.get('/edit_profile/:username', (req, res) => {

	res.render('buyer/edit_profile', {
				email: req.session.data.email, 
				email_count: req.session.data.email_count,
				msg: req.session.data.msg, 
				msg_count: req.session.data.msg_count,
				profile: req.session.user});
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
			res.redirect('/buyer/profile');

		}
		
	});
});


//      Message Controller >>>>>>>>>>>>>>>>>>>>>>>>>>

router.get('/email', (req, res) => {
	var user =   req.session.user;

	res.render('buyer/email',{fname: user.full_name});
});


router.post('/email', (req, res)=>{
	var user =   req.session.user;
	var username= {
		uname: user.username
	};

	var send_message = {
		sender: req.body.sender,
		receiver: req.body.receiver,
		subject: req.body.subject,
		body: req.body.body,
		status: 'unread',
	};

	msgModel.send_email(username,send_message, function(status){

		const output = ` <p>${req.body.body}</p>`;

  		let transporter = nodemailer.createTransport({
    		service: "Gmail",
    		auth: {
        		user: '',
        		pass: ''
    		},

    		tls:{
      			rejectUnauthorized:false
    		}
  		});

  		let mailOptions = {
      		from: req.body.sender + '<alzamiarafat00@gmail.com>', 
      		to: req.body.receiver, 
      		subject: req.body.subject, 
      		html: output
  		};
  
  		transporter.sendMail(mailOptions, (error, info) => {
      		if (error) {
          		return console.log(error);
      		}
      		console.log('Message sent: %s', info.messageId);   
      		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			res.send('email send.....');
      
  		});
	});

});
router.get('/details/:id', (req, res) => {

	var user_id = {id: req.params.id};

	main_controll.getSellerId(user_id, function(result) {

		sellersModel.getById(user_id,function (status) {
			console.log(status);
			console.log(result);

			res.render('buyer/view_profile',{
				email: req.session.data.email, 
				email_count: req.session.data.email_count,
				msg: req.session.data.msg, 
				msg_count: req.session.data.msg_count,
				profile: req.session.user, 
				user_info: result[0],
				seller_info: status[0]
			});
		});
		
		/*res.render('buyer/view_profile',{msg: result});*/
	});

	/*sellersModel.getById(user_id, function(status) {
		
	})*/
	
});


router.get('/message', (req, res) => {

	var user =   req.session.user;
	var username = {
		uname: user.username
	};

	msgModel.getMsg(username, function(result) {
		console.log(result);
		res.render('buyer/message',{msg: result});
	});

	/*sellersModel.getById(user_id, function(status) {
		
	})*/
	
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
	res.render('buyer/post_work', {
		price: null,
		email: req.session.data.email, 
		email_count: req.session.data.email_count,
		msg: req.session.data.msg, 
		msg_count: req.session.data.msg_count,
		profile: req.session.user, 
	});

});

router.post('/post',
	[
       check('amount').not().isEmpty().trim().escape().withMessage('price require.'),
    ],

    (req, res) => {
    	const error = validationResult(req);
        if(!error.isEmpty()){
            res.render('buyer/post_work', { price : error.array()[0], user: req.session.user });    
        }
        else {
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
        }

});










/*{
	[
        // check by express-validator
        check('username').not().isEmpty().trim().escape().withMessage('must type valid username'),
        check('password').not().isEmpty().trim().escape().withMessage('must type correct password')
    ],
    (req, res) => {
    	 const error = validationResult(req);
    	 if(!error.isEmpty()){
            res.render('home/login', { username : error.array()[0], password : error.array()[1] });
            // console.log(error.array());
            // console.log('error');
        }else {
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

			});

        }
    }

});*/

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



router.get('/delete/:id', (req, res) => {
	
	var post_id = {id: req.params.id};

	post_workModel.getByPostId(post_id, function (status) {
		
		res.render('buyer/delete_post', {
			email: req.session.data.email, 
			email_count: req.session.data.email_count,
			msg: req.session.data.msg, 
			msg_count: req.session.data.msg_count,
			user: req.session.user,
			delete_post: status});
	});
});


router.post('/delete/:id', (req, res) => {
	
	var post_id = {id: req.params.id};

	post_workModel.postDelete(post_id, function (status) {

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
		res.render('buyer/post_list', {
			email: req.session.data.email, 
			email_count: req.session.data.email_count,
			msg: req.session.data.msg, 
			msg_count: req.session.data.msg_count,
			user: req.session.user,
			posts: status});
	});

});


router.get('/available/:id/:status', (req, res) => {
	
	var post_id = {
		id: req.params.id,
		status: req.params.status
	};

	post_workModel.statusUpdate(post_id, function (status) {
	
		if(status == false){
			res.redirect('/buyer/post_list');

		}
	});
});


//     Seller Controller >>>>>>>>>>>>>>>>>>>>>

router.get('/sellers', (req, res) => {
	
	sellersModel.getAll(function(status){
		res.render('buyer/sellers', {
			email: req.session.data.email, 
			email_count: req.session.data.email_count,
			msg: req.session.data.msg, 
			msg_count: req.session.data.msg_count,
			user: req.session.user,
			sellers: status});
	});

});




//     reset password
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

//       Logout Controller >>>>>>>>>>>>>>>>


router.get('/logout', (req, res) => {
	req.session.user = null;
	res.redirect('home/login');
});


module.exports = router;