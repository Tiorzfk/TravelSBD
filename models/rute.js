var Sequelize = require("sequelize");
var database = require("../config/db");
var cabang = require("./cabang");

var ruteScheme = {
    id_rute: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cabang_asal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Cabang asal tidak boleh kosong.'}
        }
    },
    cabang_tujuan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Cabang tujuan tidak boleh kosong.'}
        }
    },
    harga: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Harga tidak boleh kosong.'}
        }
    }
};

var Rute = database.mysql.define("rute", ruteScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'rute',
  timestamps: false
});

Rute.belongsTo(cabang, {as: 'cabangAsal', foreignKey: 'cabang_asal'});
Rute.belongsTo(cabang, {as: 'cabangTujuan', foreignKey: 'cabang_tujuan'});

module.exports = Rute;
