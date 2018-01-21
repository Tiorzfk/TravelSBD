var express = require('express');
var router = express.Router();
var ruteController = require('../../controllers/admin/ruteController');

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  res.redirect('/admin/login');
}

router.get('/', isLoggedIn, ruteController.index);

router.get('/add', isLoggedIn, ruteController.add);
router.post('/add', isLoggedIn, ruteController.simpan);

router.get('/delete/:id', isLoggedIn, ruteController.delete);

module.exports = router;
