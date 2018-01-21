var express = require('express');
var router = express.Router();
var jadwalController = require('../../controllers/admin/jadwalController');

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  res.redirect('/admin/login');
}

router.get('/', isLoggedIn, jadwalController.index);

router.get('/add', isLoggedIn, jadwalController.add);
router.post('/add', isLoggedIn, jadwalController.simpan);

router.get('/delete/:id', isLoggedIn, jadwalController.delete);

module.exports = router;
