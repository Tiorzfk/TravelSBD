var Rute = require('../../models/rute');
var Cabang = require('../../models/cabang');
var Kota = require('../../models/kota');

module.exports.index = function(req,res) {
  Rute.findAll({
    include: [{
      model: Cabang,
      as: 'cabangAsal',
      include: [Kota]
    },
    {
      model: Cabang,
      as: 'cabangTujuan',
      include: [Kota]
    }
  ]}).then(data => {
    res.render('admin/rute', {data:data, user:req.user, message: req.flash('loginMessage')});
  }).catch(err => {
    res.redirect('/admin/rute');
  });
}

module.exports.add = function(req,res) {
  Cabang.findAll({
    include: [{
      model: Kota
    }]}).then(cabang => {
    res.render('admin/rute/tambah', {cabang:cabang, user:req.user, message: req.flash('loginMessage')});
  }).catch(error => {
    req.flash('loginMessage',error);
    res.redirect('/admin/rute/tambah');
  });
}

module.exports.simpan = function(req,res) {
  Rute.create(req.body).then(data => {
    req.flash('loginMessage','Data rute berhasil disimpan');
    res.redirect('/admin/rute/add');
  })
  .catch(error => {
    var errMsg = "";
    error.errors.forEach((data) => {
      errMsg += `${data.message} </br>`;
    });
    req.flash('loginMessage',errMsg);
    res.redirect('/admin/rute/add');
  });
}

module.exports.delete = function(req,res) {
  Rute.destroy({
    where: {
      id_rute: req.params.id
    }
  }).then(data => {
    req.flash('loginMessage','Data rute berhasil dihapus');
    res.redirect('/admin/rute');
  })
  .catch(error => {
    console.log(error);
    req.flash('loginMessage',error);
    res.redirect('/admin/rute');
  })
}
