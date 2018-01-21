var Sequelize = require("sequelize");
var database = require("../config/db");
var supir = require("./supir");
var rute = require("./rute");
var mobil = require("./mobil");

var jadwalScheme = {
    id_jadwal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_supir: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nama Supir tidak boleh kosong.'}
        }
    },
    id_rute: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Rute tidak boleh kosong.'}
        }
    },
    id_mobil: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nama Mobil tidak boleh kosong.'}
        }
    },
    jam_keberangkatan: {
        type: Sequelize.TIME,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Jam Keberangkatan tidak boleh kosong.'}
        }
    },
    lama_perjalanan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Lama perjalanan tidak boleh kosong.'}
        }
    },
    kursi_tersedia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Kursi Tersedia tidak boleh kosong.'}
        }
    }
};

var Jadwal = database.mysql.define("jadwal", jadwalScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'jadwal',
  timestamps: false
});

Jadwal.belongsTo(supir, {foreignKey: 'id_supir'});
Jadwal.belongsTo(rute, {foreignKey: 'id_rute'});
Jadwal.belongsTo(mobil, {foreignKey: 'id_mobil'});

module.exports = Jadwal;
