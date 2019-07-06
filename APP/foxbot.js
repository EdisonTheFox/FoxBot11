/**
 * Discord APIs
 */
const Discord = require('discord.js');
const DiscordClient = new Discord.Client();
const DiscordToken = 'NTUyODQ1MDI4NzU0NTg3Njgw.XN_Smw.RXNjqAxYKpdZeQ9qjswmsM0uyiE';
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
const tmi = require('tmi.js');
const opts = {
    identity: {
        username: 'FoxBot11',
        password: 'oauth:k9x8qymrea5xkhv197mncoe5f3xfxc'
    },
    channels: [
        'edisonthefox'
    ]
};
const TwitchClient = new tmi.client(opts);
/**
 * Other APIs
 */
const assert = require('assert');

/**
 * DISCORD HANDELERS
 */
DiscordClient.on('ready', () => {
    console.log(`Logged in as ${DiscordClient.user.tag}!`);
});

//Listener function for new members to the server
DiscordClient.on('guildMemberAdd', member => {
    Calls.newMember(member);
});

//A user has left the server
DiscordClient.on("guildMemeberRemove", member => {
    Calls.memberRemove(member);
});

//Messages listener for commands to be passed to the bot
DiscordClient.on("message", message => {
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
    //Twitter
    else if (message.content.startsWith('!twitter')) {
        message.reply('Edison\'s Twitter account can be found here: https://twitter.com/edisonthefox');
    }
    //YouTube 
    else if (message.content.startsWith('!youtube')) {
        message.reply('Edison\'s YouTube channel can be found here: https://www.youtube.com/channel/UC1T30bSl69LFeDdLa0YbM8A');
    }

    /**
     * Fun Commands!
     */
    //rutland
    else if (message.content.startsWith('!rutland')) {
        message.reply('Rutland is a conspiracy...');
    }
    //Cute
    else if (message.content.startsWith('!cute')) {
        message.reply('NO U!');
    }
    //hug
    else if (message.content.startsWith('!hug')) {
        message.reply('*hugs you cybernetically*');
    }
    //awooo
    else if (message.content.startsWith('!awooo')) {
        message.reply('Shhh.... You\'ll start a howl!');
    }

    /**
     * Scoring Commands
     */
    //User score
    else if (message.content.startsWith('!points')) {
        message.reply('This function will be added soon!');
        //connect to the database and print the users points value and current rank
    }
    //Server Leaderboard
    else if (message.content.startsWith('!leaderboard')) {
        message.reply('This function will be added soon!');
        //Connect to the data base and print the top 10 memebers in points order
    }

    /**
     * All other messages
     */
    else {
        //Score Points
        //scoring.discordScoreAdd(message.guild.member(message.author));
        //Connect to the DB
        (async function () {
            const client = new MongoClient(uri, {
                useNewUrlParser: true
            });
            try {
                await client.connect();
                console.log('Connected to the Database');

                const db = client.db('foxbot');
                const collection = db.collection('scores');
                let r;
                const score = generateScore();

                r = await collection.updateOne({
                    name: message.guild.member(message.author).id
                }, {
                    $inc: {
                        score: score
                    }
                }, {
                    upsert: true
                });
                assert.equal(1, r.matchedCount);
                assert.equal(0, r.upsertedCount);
                console.log(`gave ${message.author.tag} ${score} points`);
            } catch (err) {
                console.log(err);
            }
            client.close();
        })();
    }
})

DiscordClient.login(DiscordToken);

/**
 * TWITCH HANDELERS
 */

//register Event Handlers
TwitchClient.on('message', onTwitchMessage);
TwitchClient.on('connected', onTwitchConnected);

//Connect to Twitch
TwitchClient.connect();

/** Event Handlers **/

//Called when connected to Twitch Chat
function onTwitchConnected(addr, port) {
    console.log(`Connected to Twitch Chat at ${addr}:${port}`);
}

//Called when a message is sent in Twitch Chat
function onTwitchMessage(target, context, msg, self) {
    //ignore commands from the bot
    if (self) {
        return;
    }

    //get the command sent
    const command = msg.trim();

    //THE COMMANDS
    if (command === '!commands') {
        TwitchClient.say(target, 'The following commands are available: !discord, !twitter, !rutland, !games, !ch, !as2');
        console.log(`**Executed ${command} command**`);
    } else if (command === '!discord') {
        TwitchClient.say(target, 'Come join the den at https://discord.gg/7CmKjjf');
        console.log(`**Executed ${command} command**`);
    } else if (command === '!twitter') {
        TwitchClient.say(target, 'Come follow Edison on Twitter @ https://twitter.com/edisonthefox');
        console.log(`**Executed ${command} command**`);
    } else if (command === '!rutland') {
        TwitchClient.say(target, 'Rutland is a conspiracy');
        console.log(`**Executed ${command} command**`);
    } else if (command === '!games') {
        TwitchClient.say(target, 'The games Edison is playing currently are Clone Hero and Audio Surf 2. if you want to know more about Clone Hero or Audio Surf 2 use !ch or !as2');
        console.log(`**Executed ${command} command**`)
    } else if (command === '!ch') {
        TwitchClient.say(target, 'Clone Hero is a fan project to build a better Guitar Hero and to more easilly allow for Custom Songs to be imported into the game. If you need even more info head on over to the Clone Hero Discord server here: https://discord.gg/Hsn4Cgu');
        console.log(`**Executed ${command} command**`);
    } else if (command === '!as2') {
        TwitchClient.say(target, 'Edisons copy of Audio Surf 2 is using a modified file to allow the YouTube integration to be used meaning requests will open soon! If you want to know even more about Audio Surf 2, visit the Discord server here: https://discord.gg/nBGkqdF');
        console.log(`**Executed ${command} command**`);
    }

}
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

//END OF LINE