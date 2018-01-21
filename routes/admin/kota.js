var express = require('express');
var router = express.Router();
var kotaController = require('../../controllers/admin/kotaController');

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  res.redirect('/admin/login');
}

router.get('/', isLoggedIn, kotaController.index);

router.get('/add', isLoggedIn, kotaController.add);
router.post('/add', isLoggedIn, kotaController.simpan);

router.get('/delete/:id', isLoggedIn, kotaController.delete);

module.exports = router;
