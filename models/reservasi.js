var Sequelize = require("sequelize");
var database = require("../config/db");
var User = require("./user");
var Jadwal = require("./jadwal");
var moment = require('moment');

var reservasiScheme = {
    id_reservasi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'User tidak boleh kosong.'}
        }
    },
    id_jadwal: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Jadwal tidak boleh kosong.'}
        }
    },
    jumlah_reservasi: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Jumlah tidak boleh kosong.'}
        }
    },
    status: {
        type: Sequelize.ENUM,
        values: ['0','1'],
        allowNull: false
    },
    tanggal_pesan: {
        type: Sequelize.DATE
    }
};

var Reservasi = database.mysql.define("reservasi", reservasiScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'reservasi',
  timestamps: false
});

Reservasi.belongsTo(User, {foreignKey: 'id_user'});
Reservasi.belongsTo(Jadwal, {foreignKey: 'id_jadwal'});

module.exports = Reservasi;
