var express = require('express');
var router = express.Router();
var supirController = require('../../controllers/admin/supirController');

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  res.redirect('/admin/login');
}

router.get('/', isLoggedIn, supirController.index);

router.get('/add', isLoggedIn, supirController.add);
router.post('/add', isLoggedIn, supirController.simpan);

router.get('/delete/:id', isLoggedIn, supirController.delete);

module.exports = router;
