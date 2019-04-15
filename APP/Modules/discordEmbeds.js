/**
 * This module is designed for constructing Embeds for Discord.
 * This will be called when an Embed is required to be created.
 */

const discord = require('discord.js');

//globaly define the embed object
const embed = new discord.RichEmbed();

function embedNew(title, body) {
    embed.setTitle(title);
    embed.setDescription(body);
    embed.setColor('GREEN');
    embed.setTimestamp();

    return embed;
}

function embedUserUpdate(title, body) {
    embed.setTitle(title);
    embed.setDescription(body)
    embed.setTimestamp();
    embed.setColor('ORANGE');
    return embed;
}

function embedUserRemove(title, body) {
    embed.setTitle(title);
    embed.setDescription(body);
    embed.setTimestamp();
    embed.setColor('RED');
}

module.exports = {
    embedNew,
    embedUserUpdate,
    embedUserRemove
}