/**
 * This module contains all moderarion commands
 */

const logger = require('./discordLogging.js');

function kickUser(message, author) {
    //Assuming a user was mentioned this will return the user from the message
    const user = message.mentions.users.first();

    //if a user was mentioned we can begin the kick
    if (user) {
        //get the member from the user
        const member = message.guild.member(user);

        //If the member is in the guild
        if (member) {
            /**
             * Kick the MEMBER
             * Only ever run this on a Member
             */

            member.kick('Kicked The Member').then(() => {
                message.reply(`Successfully kicked ${user.tag}`);
                logger.userKicked(member, author);
            }).catch(err => {
                //If the bot cannot kick the user...
                message.reply('I was unable to kick the member.');
                //log to the console
                console.log(err);
            });
        } else {
            //The menetioned user is not in the guild
            message.reply('That user isn\'t a member of this server');
        }
    } else {
        //If there is no user mentioned
        message.reply('You need to mention a user to kick them');
    }

    return;
}

module.exports = {
    kickUser
}