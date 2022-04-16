const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    name: 'drip',
    description: 'Dripify an image',
    usage: 'drip [@User/ userID/ image]',
    aliases: [],
    cooldown: '5',
    botPermissions: [],
    requiredPermissions: [],
    category: 'Fun',
    ownerOnly: false,
    /**
    *@param {Client} client
    *@param {Message} message
    *@param {String[]} args
    */

    async run (client, message, args) {

        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

        let image;

        if (message.attachments.first()) image = message.attachments.first().proxyURL;

        else image = member.user.displayAvatarURL({dynamic: false, format: 'png'})

        message.channel.send(
            new MessageAttachment(`https://api.decc00n.tk/canvas/drip?key=${process.env.API_KEY}&imgUrl=${image}`, 'drip.png')
        )

    }
}