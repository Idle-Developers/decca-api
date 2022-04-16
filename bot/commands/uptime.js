const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js')
const pretty = require('pretty-ms');

module.exports = {
    name: 'uptime',
    description: 'Shows the bot\'s uptime',
    usage: 'uptime',
    aliases: ['up'],
    cooldown: '5',
    botPermissions: [],
    requiredPermissions: [],
    category: 'Info',
    ownerOnly: false,
    /**
    *@param {Client} client
    *@param {Message} message
    *@param {String[]} args
    */

    async run (client, message, args) {

        const embed = new MessageEmbed()
        .setTitle('Uptime')
        .setColor('BLUE')
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`I have been up for **${pretty(client.uptime)}**`)

        message.channel.send(embed);

    }
}