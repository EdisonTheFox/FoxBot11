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
    console.log(body);
    return;
}

function userRoleUpdated(memberName, roleID) {
    const loggingChannel = memberName.guild.channels.find(ch => ch.name === 'bot-logs');
    var title = 'User Role Updated';
    var body = `${memberName} was given the <@&` + roleID + `> role.`

    //Log the role update to the logging channel
    loggingChannel.send(embed.embedUserUpdate(title, body));
    console.log(body);
    return;
}

function userLeave(memberName) {
    const loggingChannel = memberName.guild.channels.find(ch => ch.name === 'bot-logs');
    var title = 'User Left';
    var body = `${memberName} has left the server.`;
    loggingChannel.send(embed.embedUserRemove(title, body));
}

function userKicked(member, author) {
    const loggingChannel = member.guild.channels.find(ch => ch.name === 'bot-logs');
    var title = 'User Kicked';
    var body = `${member} has been kicked by ${author}.`;
    loggingChannel.send(embed.embedUserRemove(title, body));
}

function invalidActionTaken(member, action){
    const loggingChannel = member.guild.channels.find(ch=>ch.name==='bot-logs');
    loggingChannel.send(`<@&347124301347946496>, <@198192592620355584>. ${member} has just tried to ${action}`);
}

module.exports = {
    userNew,
    userRoleUpdated,
    userLeave,
    userKicked,
    invalidActionTaken
}