const Discord = require('discord.js');
const Client = new Discord.Client();
const Calls = require('./Modules/discordCalls.js');

Client.on('ready', () => {
    console.log(`Logged in as ${Client.user.tag}!`);
});

Client.on('guildMemberAdd', member => {
    Calls.newMember(member);
});

Client.login('NTUyODQ1MDI4NzU0NTg3Njgw.XLJOSw.CqY0L_X5pQSsl1Xbw6RWYeVG47A');