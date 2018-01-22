var express = require('express');
var router = express.Router();
var Jadwal = require('../../models/jadwal');
var Cabang = require('../../models/cabang');
var Rute = require('../../models/rute');
var Kota = require('../../models/kota');
var Mobil = require('../../models/mobil');
var Reservasi = require('../../models/reservasi');
var async = require('async');
var sequelize = require('sequelize');

router.get('/cabang/:id_kota', function(req, res, next) {
  Cabang.findAll({ where : {id_kota:req.params.id_kota}}).then(cabang => {
    res.json({status:200,message:'success',result:cabang});
  }).catch(error => {
    res.json({status:200,message:error,result:[]});
  });
});

router.get('/rute/:cabang_asal', function(req, res, next) {
  Rute.findAll({
      where : {cabang_asal: req.params.cabang_asal},
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
    res.json({status:200,message:'success',result:rute});
  }).catch(error => {
    res.json({status:200,message:error,result:[]});
  });
});

router.get('/jadwal/:id_rute', function(req, res, next) {
  Jadwal.findAll({ where: {id_rute:req.params.id_rute} }).then(jadwal => {
    res.json({status:200,message:'success',result:jadwal});
  }).catch(error => {
    res.json({status:200,message:error,result:[]});
  });
});

router.get('/kursiTersedia/:id_jadwal/:tanggal', function(req, res, next) {
  async.waterfall([
    function(callback) {
      Jadwal.findOne({
        attributes : ['id_jadwal'],
        where : {id_jadwal:req.params.id_jadwal},
        include : [Mobil]
      }).then(mobil => {
        callback(null,mobil.mobil.jumlah_kursi);
      });
    },
    function(mobil,callback) {
      Reservasi.sum('jumlah_reservasi', {
        where : {
          id_jadwal:req.params.id_jadwal,
          tanggal_pesan:req.params.tanggal
        }
      }).then(jumlahKursi => {
        callback(null,mobil,jumlahKursi);
      }).catch(error => {
        callback(error,null,null);
      });
      // Reservasi.findAll({
      //   where : {
      //       id_jadwal:8,
      //       tanggal_pesan:'2018-02-22'
      //     }
      // }).then(data => {
      //   callback(null,mobil,data);
      // });
    }
  ], function(err, mobil, jumlahKursi) {
      // res.json({mobil:mobil,jumlahKursi:jumlahKursi});
      var kursiTersedia = mobil - jumlahKursi;
      res.json({status:200,message:'success',result:{mobil:mobil,jumlahKursi:jumlahKursi,kursiTersedia:kursiTersedia}});
  });
});

module.exports.simpanReservasi = function(req,res) {
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
      var kursiTersedia = mobil - jumlahKursi;
      if(kursiTersedia < req.body.jumlah_reservasi) {
        res.json({status:400,message:'Jumlah reservasi tidak mencukupi',result:[]});
      }else{
        Reservasi.create(req.body).then(data => {
          res.json({status:200,message:'Data Reservasi berhasil disimpan',result:[]});
        })
        .catch(error => {
          res.json({status:400,message:error,result:[]});
        });
      }
  });

}

module.exports = router;
