var Sequelize = require("sequelize");
var database = require("../config/db");
var kota = require("./kota");

var cabangScheme = {
    id_cabang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_kota: {
        type: Sequelize.INTEGER(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nama Kota tidak boleh kosong.'}
        }
    },
    nama_cabang: {
        type: Sequelize.STRING(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nama Cabang tidak boleh kosong.'}
        }
    }
};

var Cabang = database.mysql.define("cabang", cabangScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'cabang',
  timestamps: false
});

Cabang.belongsTo(kota, {foreignKey: 'id_kota'});

module.exports = Cabang;
