/**
 * This module is for managing the scoring calls to
 * and from the main FoxBot database.
 * All scoring from both Discord (and in the furutre Twitch)
 * will be handled by this module.
 * To start all scores for the platforms will be kept separate.
 * There are plans in the future to consolidate the systems into
 * one giant database.
 */

const discord = require('discord.js');

function generateScore() {
    return Math.floor(Math.random() * Math.floor(25));
}

function discordScoreAdd(member) {
    var memberName = member.user.tag;
    var scoreAddValue = generateScore();
    console.log(`Gave ${memberName} ${scoreAddValue} points!`);
    //TODO: Add call to DB to add score to user
}

module.exports = {
    discordScoreAdd
}