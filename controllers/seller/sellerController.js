const express           = require('express');
const router            = express.Router();


router.get('/sellerController', (req, res) => {
    res.send("<h1>I'm seller</h1>");
});



module.exports = router;