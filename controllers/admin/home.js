const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	//var uname = req.cookies['uname'];
	res.render('admin/index');
	
});
module.exports = router;