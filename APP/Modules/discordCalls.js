/**
 * This module is for core discord calls. Modearion is separate
 */

//Store the Server Name as a variable for later
const logger = require('./discordLogging.js');

function newMember(memberName) {
    //This is the channel to post the welcome message to
    const channel = memberName.guild.channels.find(ch => ch.name === 'welcome');
    var kilobyesRoleID = '281581612414795787';

    //Check that the channel exists, if it doesn't break out of the function gracefully
    if (!channel) {
        console.log(`Channel with the name: ${channel}, Was not found.`);
        return;
    }

    //send a message to the #welcome channel greeting the user
    channel.send(`Welcome to the server, ${memberName}! Please read the rules in <#539378325613707265> and enjoy your stay!`);
    console.log(`${memberName} Joined the server!`);

    //Assign the new memeber the Kilobytes Role
    memberName.addRole(kilobyesRoleID);
    console.log(`Gave ${memberName} the ${kilobyesRoleID} role!`);

    /**
     * Logging *
     */

    //New user
    logger.userNew(memberName);

    //role Updated
    logger.userRoleUpdated(memberName, kilobyesRoleID);
}

function memberRemove(memberName) {
    logger.userLeave(memberName)
}

module.exports = {
    newMember,
    memberRemove
}