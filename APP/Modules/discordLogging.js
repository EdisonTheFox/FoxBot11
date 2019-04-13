/**
 * This module is designed to log all activity on the server
 */

//This is the logging channel to be used by ALL logging functions

//Require the embed module
const embed = require('./discordEmbeds.js');

function userNew(memberName) {
    const loggingChannel = memberName.guild.channels.find(ch => ch.name === 'bot-logs');
    var title = 'New Member';
    var body = `${memberName} has joined the server.`

    //Log the new member in the logging channel
    loggingChannel.send(embed.embedNew(title, body));
    return;
}

function userRoleUpdated(memberName, roleID) {
    const loggingChannel = memberName.guild.channels.find(ch => ch.name === 'bot-logs');
    var title = 'User Role Updated';
    var body = `${memberName} was given the <@&` + roleID + `> role.`

    //Log the role update to thelogging channel
    loggingChannel.send(embed.embedUserUpdate(title, body));
    return;
}

module.exports = {
    userNew,
    userRoleUpdated
}