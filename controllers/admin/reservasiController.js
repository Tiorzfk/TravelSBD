var Reservasi = require('../../models/reservasi');
var Jadwal = require('../../models/jadwal');
var Kota = require('../../models/kota');
var Mobil = require('../../models/mobil');
var async = require('async');

module.exports.add = function(req,res) {
  // async.waterfall([
  //   function(callback) {
  //     Kota.findAll({}).then(kota => {
  //       callback(null,kota);
  //     }).catch(error => {
  //       callback(error,null);
  //     });
  //   },
  //   function(kota,callback) {
  //     Jadwal.findAll({}).then(jadwal => {
  //       callback(null, kota, jadwal);
  //     }).catch(error => {
  //       callbacn(error, null, null)
  //     });
  //   }
  // ], function(err, kota, jadwal) {
  //     res.json({kota:kota,jadwal:jadwal});
  // });
  Kota.findAll({}).then(kota => {
    res.render('admin/reservasi/tambah', {user:req.user,kota:kota, message: req.flash('loginMessage')});
  }).catch(error => {
    req.flash('loginMessage',error);
    res.redirect('/admin/reservasi/add')
  });

}

module.exports.simpan = function(req,res) {
  req.body.id_user = req.user.id_user;
  req.body.status = '0';
  async.waterfall([
    function(callback) {
      Jadwal.findOne({
        attributes : ['id_jadwal'],
        where : {id_jadwal:req.body.id_jadwal},
        include : [Mobil]
      }).then(mobil => {
        callback(null,mobil.mobil.jumlah_kursi);
      });
    },
    function(mobil,callback) {
      Reservasi.sum('jumlah_reservasi', {
        where : {
          id_jadwal:req.body.id_jadwal,
          tanggal_pesan:req.body.tanggal_pesan
        }
      }).then(jumlahKursi => {
        callback(null,mobil,jumlahKursi);
      }).catch(error => {
        callback(error,null,null);
      });
    }
  ], function(err, mobil, jumlahKursi) {
      // res.json({mobil:mobil,jumlahKursi:jumlahKursi});
      var kursiTersedia = mobil - jumlahKursi;
      console.log(kursiTersedia);
      if(kursiTersedia < req.body.jumlah_reservasi) {
        req.flash('loginMessage','Jumlah reservasi tidak mencukupi');
        res.redirect('/admin/reservasi/add');
      }else{
        Reservasi.create(req.body).then(data => {
          req.flash('loginMessage','Data Reservasi berhasil disimpan');
          res.redirect('/admin/reservasi/add');
        })
        .catch(error => {
          var errMsg = "";
          error.errors.forEach((data) => {
            errMsg += `${data.message} </br>`;
          });
          req.flash('loginMessage',errMsg);
          res.redirect('/admin/reservasi/add');
        });
      }
  });

}

module.exports.delete = function(req,res) {
  Reservasi.destroy({
    where: {
      id_reservasi: req.params.id
    }
  }).then(data => {
    req.flash('loginMessage','Data Reservasi berhasil dihapus');
    res.redirect('/admin/reservasi');
  })
  .catch(error => {
    req.flash('loginMessage',error);
    res.redirect('/admin/reservasi');
  })
}
