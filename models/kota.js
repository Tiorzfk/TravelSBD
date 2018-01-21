var Sequelize = require("sequelize");
var database = require("../config/db");

var kotaScheme = {
    id_kota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: Sequelize.STRING(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nama Kota tidak boleh kosong.'}
        }
    }
};

var Kota = database.mysql.define("kota", kotaScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'kota',
  timestamps: false
});

module.exports = Kota;
