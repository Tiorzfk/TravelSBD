var Supir = require('../../models/supir');

module.exports.index = function(req,res) {
  Supir.findAll({}).then(data => {
    res.render('admin/supir', {data:data, user:req.user, message: req.flash('loginMessage')});
  }).catch(err => {
    res.redirect('/admin/supir');
  });
}

module.exports.add = function(req,res) {
  res.render('admin/supir/tambah', {user:req.user, message: req.flash('loginMessage')});
}

module.exports.simpan = function(req,res) {
  Supir.create(req.body).then(data => {
    req.flash('loginMessage','Data supir berhasil disimpan');
    res.redirect('/admin/supir/add');
  })
  .catch(error => {
    var errMsg = "";
    error.errors.forEach((data) => {
      errMsg += `${data.message} </br>`;
    });
    req.flash('loginMessage',errMsg);
    res.redirect('/admin/supir/add');
  });
}

module.exports.delete = function(req,res) {
  Supir.destroy({
    where: {
      id_supir: req.params.id
    }
  }).then(data => {
    req.flash('loginMessage','Data supir berhasil dihapus');
    res.redirect('/admin/supir');
  })
  .catch(error => {
    console.log(error);
    req.flash('loginMessage',error);
    res.redirect('/admin/supir');
  })
}
