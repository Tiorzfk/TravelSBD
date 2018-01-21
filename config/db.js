var sequlize = require("sequelize");

// var connectionString = process.env.driver + "://" + process.env.username + ":" + process.env.password + "@" +
//     process.env.host + ":" + (process.env.port || 3306) + "/" + process.env.database;

var connectionString = "mysql://root:code@labs@52.230.4.225:3306/travel";

var database = new sequlize(connectionString, {timezone: 'Asia/Jakarta'});

database.authenticate().then(function () {
    console.log("Database connection has been successfully established");
}).catch(function (err) {
    console.log("Database unable to connect: ", err.message);
});

module.exports = {
    mysql: database
};
