var Jadwal = require('../../models/jadwal');
var Rute = require('../../models/rute');
var Supir = require('../../models/supir');
var Mobil = require('../../models/mobil');
var Cabang = require('../../models/cabang');
var Kota = require('../../models/kota');
var async = require('async');

module.exports.index = function(req,res) {
  Jadwal.findAll(
    {
      include: [{
        model : Rute,
        include : [{
          model : Cabang,
          as : 'cabangAsal',
          include : [Kota]
        },{
          model : Cabang,
          as : 'cabangTujuan',
          include : [Kota]
        }]
      },{
        model : Supir
      },{
        model : Mobil
      }]
    }
  ).then(data => {
    // res.json(data);
    res.render('admin/jadwal', {data:data, user:req.user, message: req.flash('loginMessage')});
  }).catch(err => {
    res.redirect('/admin/jadwal');
  });
}

module.exports.add = function(req,res) {
  async.waterfall([
    function(callback) {
        Supir.findAll({}).then(supir => {
          callback(null, supir);
        }).catch(error => {
          callback(error, null);
        });
    },
    function(supir, callback) {
        Rute.findAll({
          include : [{
            model : Cabang,
            as : 'cabangAsal',
            include : [Kota]
          },{
            model : Cabang,
            as : 'cabangTujuan',
            include : [Kota]
          }]
        }).then(rute => {
          callback(null, supir, rute);
        }).catch(error => {
          callback(error, null, null);
        });
    },
    function(supir, rute, callback) {
        Mobil.findAll({}).then(mobil => {
          callback(null, supir, rute, mobil);
        }).catch(error => {
          callback(error, null, null, null);
        });
    }
], function (err, supir, rute, mobil) {
    if(err)
      res.json(err);

    // res.json({supir:supir,rute:rute,mobil:mobil});
    res.render('admin/jadwal/tambah', {mobil:mobil, rute:rute, supir:supir, user:req.user, message: req.flash('loginMessage')});
});
}

module.exports.simpan = function(req,res) {
  Jadwal.create(req.body).then(data => {
    req.flash('loginMessage','Data jadwal berhasil disimpan');
    res.redirect('/admin/jadwal/add');
  })
  .catch(error => {
    console.log(error);
    var errMsg = "";
    error.errors.forEach((data) => {
      errMsg += `${data.message} </br>`;
    });
    req.flash('loginMessage',errMsg);
    res.redirect('/admin/jadwal/add');
  });
}

module.exports.delete = function(req,res) {
  Jadwal.destroy({
    where: {
      id_jadwal: req.params.id
    }
  }).then(data => {
    req.flash('loginMessage','Data jadwal berhasil dihapus');
    res.redirect('/admin/jadwal');
  })
  .catch(error => {
    console.log(error);
    req.flash('loginMessage',error);
    res.redirect('/admin/jadwal');
  })
}
