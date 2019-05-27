/**
 * This module is for managing all SQL calls to the Database hosted in Azure
 * Database address: foxbot.database.windows.net
 */
const mongodb = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function dbConnect(collection) {
  mongodb.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db('foxbot');
    const collection = db(collection);
  });
}

/**This function will check the user exists, if not then it will create the
 * user in the DB
 */
funtion dbUserCheck(discordID) {
  //connect to the db
  mongodb.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db('foxbot');
    const collection = db(collection);

    //check the user exists
    collection.findOne({ID: discordID}, (err, item) => {
      if (err) {
        collection.insertOne({ID: discordID, score: 20}, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`the following has been added to the DB: ${result}`);
          client.close();
          return "false";
        });
      }
      console.log(item);
      client.close();
      return "true";
    });
  });
}

function dbScoreAdd(discordID, points) {
  var user = dbUserCheck(discordID);
  if (user = 0){
    return;
  }
  else{
    //connect to the db
    mongodb.connect(url, (err, client) => {
      if (err) {
        console.error(err);
        return;
      }
      const db = client.db('foxbot');
      const collection = db(collection);

    //update the score for the user
    collection.updateOne({ID:discordID},{$inc:{score:points}}, (err, item)=> {
      if(err){
        console.error(err);
        return;
      }
      console.log(item);
      client.close();
    })
  )};
}

module.exports = {
  dbScoreAdd
}
