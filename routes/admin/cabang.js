var express = require('express');
var router = express.Router();
var cabangController = require('../../controllers/admin/cabangController');

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  res.redirect('/admin/login');
}

router.get('/', isLoggedIn, cabangController.index);

router.get('/add', isLoggedIn, cabangController.add);
router.post('/add', isLoggedIn, cabangController.simpan);

router.get('/delete/:id', isLoggedIn, cabangController.delete);

module.exports = router;
