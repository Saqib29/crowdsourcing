const express           = require('express');
const router            = express.Router();


router.get('/buyerController', (req, res) => {
    res.send("<h1>I'm buyer</h1>");
});



module.exports = router;