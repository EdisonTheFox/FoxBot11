/**
 * Discord APIs
 */
const Discord = require('discord.js');
const Client = new Discord.Client();
const Calls = require('./Modules/discordCalls.js');
const moderator = require('./Modules/discordModeration.js');
const logger = require('./Modules/discordLogging');
/**
 * Database APIs
 */
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://foxbot:twihUBFp6nQkiySt@edisonthefox-4czwj.gcp.mongodb.net/test?retryWrites=true&w=majority';

/**
 * Twitch APIs
 */

 /**
  * Other APIs
  */
 const assert = require('assert');

/**
 * DISCORD HANDELERS
 */
Client.on('ready', () => {
    console.log(`Logged in as ${Client.user.tag}!`);
});

//Listener function for new members to the server
Client.on('guildMemberAdd', member => {
    Calls.newMember(member);
});

//A user has left the server
Client.on("guildMemeberRemove", member => {
    Calls.memberRemove(member);
});

//Messages listener for commands to be passed to the bot
Client.on("message", message => {
    //Ignore Messages that arent from a guild
    if (!message.guild) return;

    /**
     * MODERATION TOOLS HERE *
     */

    //Kick command
    else if (message.content.startsWith('!kick')) {
        //checks if authour has permission to kick users
        if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
            moderator.kickUser(message);
        } else {
            message.reply('You do not have permission to do that. You attempt has been logged and moderators notified.');
            logger.invalidActionTaken(message.guild.member(message.author).id, 'Kick a user');
        }
    }

    /**
     * Social Medias
     */
    else if (message.content.startsWith('!twitter')) {
        message.reply('Edison\'s Twitter account can be found here: https://twitter.com/edisonthefox');
    } else if (message.content.startsWith('!youtube')) {
        message.reply('Edison\'s YouTube channel can be found here: https://www.youtube.com/channel/UC1T30bSl69LFeDdLa0YbM8A');
    }

    /**
     * Fun Commands!
     */
    //rutland
    else if (message.content.startsWith('!rutland')) {
        message.reply('Rutland is a conspiracy...');
    }

    /**
     * All other messages
     */
    else {
        //Score Points
        //scoring.discordScoreAdd(message.guild.member(message.author));
        //Connect to the DB
        (async function(){
            const client = new MongoClient(uri, {useNewUrlParser:true});
            try{
                await client.connect();
                console.log('Connected to the Database');
                
                const db = client.db('foxbot');
                const collection = db.collection('scores');
                let r;
                const score = generateScore();

                r = await collection.updateOne({name:message.guild.member(message.author).id}, {$inc:{score:score}},{upsert:true});
                assert.equal(1, r.matchedCount);
                assert.equal(0, r.upsertedCount);
                console.log(`gave ${message.author.tag} ${score} points`);
            }catch(err){
                console.log(err);
            }
            client.close();
        })();
    }
})

Client.login('NTUyODQ1MDI4NzU0NTg3Njgw.XN_Smw.RXNjqAxYKpdZeQ9qjswmsM0uyiE');

/**
 * TWITCH HANDELERS
 */

/**
 * Other Functions for core functionality
 */

function generateScore() {
    var min = 1;
    var max = 20;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

