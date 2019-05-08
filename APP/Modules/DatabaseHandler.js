/**
 * This module is for managing all SQL calls to the Database hosted in Azure
 * Database address: foxbot.database.windows.net
 */
const mysql = require('mysql');
var config = {
    host: 'foxbot.database.windows.net',
    user: 'foxbot@stanleyyork.co.uk',
    password: 'PASSWORD HERE',
    database: 'symedia-db-FoxBot',
    port: 3306,
    ssl: true
};

const conn = new mysql.createConnection(config);

function connectDB() {
    conn.connect(
        function (err) {
            if (err) {
                console.log('!!! CAN\'T CONNECT!!!');
                throw err;
            } else {
                console.log('Connection Established');
            }
        }
    );
    return;
}

function disconnectDB() {
    conn.end(
        function (err) {
            if (err) {
                throw (err);
            } else {
                console.log('Closing Connection');
            }
        }
    );
    return;
}

function queryInsertDB(sqlQuery) {
    //Open Connection to the Database
    connectDB();

    //DO DATABASE MAGIC HERE

    //Close Connection to save Bandwidth
    disconnectDB()

    return;
}

function queryReadDB(sqlQuery){
        //Open Connection to the Database
        connectDB();

        //DO DATABASE MAGIC HERE
    
        //Close Connection to save Bandwidth
        disconnectDB()
    
        return;
}

module.exports = {
    queryInsertDB,
    queryReadDB
}