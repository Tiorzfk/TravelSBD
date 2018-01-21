var Sequelize = require("sequelize");
var database = require("../config/db");

var mobilScheme = {
    id_unit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    no_polisi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nomor polisi tidak boleh kosong.'}
        }
    },
    jumlah_kursi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Jumlah Kursi tidak boleh kosong.'}
        }
    }
};

var Mobil = database.mysql.define("mobil", mobilScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'mobil',
  timestamps: false
});

module.exports = Mobil;
