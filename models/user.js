var Sequelize = require("sequelize");
var database = require("../config/db");

var userScheme = {
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: Sequelize.STRING(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Nama tidak boleh kosong.'}
        }
    },
    email: {
        type: Sequelize.STRING(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Email tidak boleh kosong.'}
        }
    },
    password: {
        type: Sequelize.STRING(15),
        allowNull: false,
        validate : {
          notEmpty: {args:true,msg:'Password tidak boleh kosong.'}
        }
    },
    jenis_user: {
        type: Sequelize.ENUM,
        values: ['admin','fo','member'],
        allowNull: false
    }
};

var User = database.mysql.define("user", userScheme, {
  paranoid: true,
  underscored: true,
  tableName: 'user',
  timestamps: false
});

module.exports = User;
