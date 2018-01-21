var Kota = require('../../models/Kota');

module.exports.index = function(req,res) {
  Kota.findAll({}).then(data => {
    res.render('admin/kota', {data:data, user:req.user, message: req.flash('loginMessage')});
  }).catch(err => {
    res.redirect('/admin/kota');
  });
}

module.exports.add = function(req,res) {
  res.render('admin/kota/tambah', {user:req.user, message: req.flash('loginMessage')});
}

module.exports.simpan = function(req,res) {
  Kota.create(req.body).then(data => {
    req.flash('loginMessage','Data Kota berhasil disimpan');
    res.redirect('/admin/kota/add');
  })
  .catch(error => {
    var errMsg = "";
    error.errors.forEach((data) => {
      errMsg += `${data.message} </br>`;
    });
    req.flash('loginMessage',errMsg);
    res.redirect('/admin/kota/add');
  });
}

module.exports.delete = function(req,res) {
  Kota.destroy({
    where: {
      id_kota: req.params.id
    }
  }).then(data => {
    req.flash('loginMessage','Data Kota berhasil dihapus');
    res.redirect('/admin/kota');
  })
  .catch(error => {
    console.log(error);
    req.flash('loginMessage',error);
    res.redirect('/admin/kota');
  })
}
