var express = require('express');
var router = express.Router();
var reservasiController = require('../../controllers/admin/reservasiController');

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  res.redirect('/admin/login');
}

router.get('/add', isLoggedIn, reservasiController.add);
router.post('/add', isLoggedIn, reservasiController.simpan);

router.get('/delete/:id', isLoggedIn, reservasiController.delete);

module.exports = router;
