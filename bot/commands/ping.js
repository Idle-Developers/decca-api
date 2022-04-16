const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Shows the api latency and the bot\'s response time',
    usage: 'ping',
    aliases: [],
    cooldown: '3',
    botPermissions: [],
    requiredPermissions: [],
    category: 'Info',
    ownerOnly: false,
    /**
    *@param {Client} client
    *@param {Message} message
    *@param {String[]} args
    */

    async run(client, message, args) {

        const msg = await message.channel.send("<a:loading:753364184561090681> Pinging...");

        const Embed = new MessageEmbed()
            .setTitle("Pong!")
            .setDescription(
                `⌛ Latency is ${Math.floor(
                    msg.createdTimestamp - message.createdTimestamp
                )}ms\n⏲️ API Ping is ${Math.round(client.ws.ping)}`
            )
            .setColor('BLUE');

        msg.edit(Embed);

        msg.edit("\u200b");

    }
}