const express 	= require('express');
const router 	= express.Router();

router.get('/adminController', (req, res)=>{
	//var uname = req.cookies['uname'];
	res.render('admin/index');
	
});
module.exports = router;