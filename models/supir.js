var Sequelize = require("sequelize");
var database = require("../config/db");

var supirScheme = {
    id_supir: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: Sequelize.STRING(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nama Supir tidak boleh kosong.'}
        }
    },
    alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Alamat tidak boleh kosong.'}
        }
    },
    no_telp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nomor Telepon tidak boleh kosong.'}
        }
    },
    foto: {
        type: Sequelize.TEXT,
        allowNull: false
    }
};

var Supir = database.mysql.define("supir", supirScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'supir',
  timestamps: false
});

module.exports = Supir;
