var Cabang = require('../../models/cabang');
var Kota = require('../../models/kota');

module.exports.index = function(req,res) {
  Cabang.findAll({
    include: [{
      model: Kota
    }]}).then(data => {
    res.render('admin/cabang', {data:data, user:req.user, message: req.flash('loginMessage')});
  }).catch(err => {
    res.redirect('/admin/cabang');
  });
}

module.exports.add = function(req,res) {
  Kota.findAll({}).then(kota => {
    res.render('admin/cabang/tambah', {user:req.user,kota:kota, message: req.flash('loginMessage')});
  }).catch(error => {
    req.flash('loginMessage',error);
    res.redirect('/admin/cabang/add')
  });

}

module.exports.simpan = function(req,res) {
  Cabang.create(req.body).then(data => {
    req.flash('loginMessage','Data Cabang berhasil disimpan');
    res.redirect('/admin/cabang/add');
  })
  .catch(error => {
    var errMsg = "";
    error.errors.forEach((data) => {
      errMsg += `${data.message} </br>`;
    });
    req.flash('loginMessage',errMsg);
    res.redirect('/admin/cabang/add');
  });
}

module.exports.delete = function(req,res) {
  Cabang.destroy({
    where: {
      id_cabang: req.params.id
    }
  }).then(data => {
    req.flash('loginMessage','Data Cabang berhasil dihapus');
    res.redirect('/admin/cabang');
  })
  .catch(error => {
    console.log(error);
    req.flash('loginMessage',error);
    res.redirect('/admin/cabang');
  })
}
