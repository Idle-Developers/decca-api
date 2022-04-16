require('dotenv').config()

const discord = require('discord.js');
const { join } = require('path');
const fs = require('fs');

const client = new discord.Client({
    disableMentions: 'everyone'
});

client.commands = new discord.Collection();

const commandFiles = fs.readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
    console.log(`[Commands] Registered ${command.name}`)
}

client.on('ready', () => {
    console.log('API bot is online');
    client.user.setActivity('a!api | api.decc00n.tk', { type: 'WATCHING' });
})

client.on('message', (message) => {
    require('./events/message')(message)
})

client.on('guildMemberAdd', (member) => {
    require('./events/guildMemberAdd')(member)
})

client.on('guildMemberRemove', (member) => {
    require('./events/guildMemberRemove')(member)
})

module.exports = client;

client.login(process.env.TOKEN)