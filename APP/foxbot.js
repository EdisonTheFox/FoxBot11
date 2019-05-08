const Discord = require('discord.js');
const Client = new Discord.Client();
const Calls = require('./Modules/discordCalls.js');
const moderator = require('./Modules/discordModeration.js');
const logger = require('./Modules/discordLogging');

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
    if (message.content.startsWith('!kick')) {
        //checks if authour has permission to kick users
        if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
            moderator.kickUser(message);
        } else{
            message.reply('You do not have permission to do that. You attempt has been logged and moderators notified.');
            logger.invalidActionTaken(message.guild.member(message.author).id, 'Kick a user');
        }
    }

    /**
     * Fun Commands!
     */

    /**
     * All other messages
     */
    else{
        //Score Points
    }
})

Client.login('TOKEN');