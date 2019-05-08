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

function incrementScoreDB(discordUID, score) {
    //Format SQL with Given Parameters:
    var checkUserExists = 'SELECT COUNT * FROM Scores WHERE DiscordID = \'' + discordUID + '\';'
    var addScore = 'UPDATE Scores SET score = score + ' + score + ' WHERE DiscordID = \'' + discordUID + '\';'

    //Open Connection to the Database
    connectDB();

    //DO DATABASE MAGIC HERE
    //Check user is in DB
    conn.query(checkUserExists, function (err, results, field) {
        if (err) {
            throw (err)
        } else {
            console.log('Found: ' + results + ' Results!');
            if (results === 1) {
                //increment score
                conn.query(addScore, function(err,results,field){
                    if(err){
                        throw(err);
                    }
                    console.log('Score updated!');
                })
            } else {
                queryNewUserDB(discordUID);
            }
        }
    })
    //Close Connection to save Bandwidth
    disconnectDB()

    return;
}

function queryNewUserDB(discordUID) {
    var query = 'INSERT INTO Scores (DiscordID, Score) VALUES(\''+discordUID+'\', 25';
    //Open Connection to the Database
    connectDB();

    //DO DATABASE MAGIC HERE
    conn.query(query, function(err,results,field){
        if(err){
            throw(err);
        }
        console.log('User Added!');
    })

    //Close Connection to save Bandwidth
    disconnectDB()

    return;
}

module.exports = {
    incrementScoreDB
}