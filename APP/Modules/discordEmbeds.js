/**
 * This module is designed for constructing Embeds for Discord.
 * This will be called when an Embed is required to be created.
 */

const discord = require('discord.js');

//globaly define the embed object
const embed = discord.RichEmbed();

function embedNew(title, body) {
    embed.setTitle(title);
    embed.setBody(body);
    embed.setColor('GREEN');
    embed.setTimestamp();

    return embed;
}

function embedUserUpdate(title, body){
    embed.setTitle(title);
    embed.setBody(body)
    embed.setTimestamp();
    embed.setColor('ORANGE');
    return embed;
}

module.exports ={
    embedNew,
    embedUserUpdate
}