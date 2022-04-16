const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    name: 'makememe',
    description: 'Make a top text bottom text meme',
    usage: 'makememe [image] <top text>|<bottom text>',
    aliases: ['m-m'],
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

        let member = message.member;

        let content = args.join(' ')

        if (!content) return message.channel.send({
            embed: {
                color: 'RED',
                title: 'Error!',
                description: 'Invalid arguments!\n**Example**: `hello|hi`'
            }
        })

        let options = content.split('|')

        if (!options) return message.channel.send({
            embed: {
                color: 'RED',
                title: 'Error!',
                description: 'Invalid arguments!\n**Example**: `hello|hi`'
            }
        })

        let image;

        if (message.attachments.first()) image = message.attachments.first().proxyURL;

        else image = member.user.displayAvatarURL({dynamic: false, format: 'png'})

        let topTxt;

        let botTxt;

        topTxt = options[0];

        botTxt = options[1] || 'bottom text'

        message.channel.send(
            new MessageAttachment(`https://api.decc00n.tk/canvas/makememe?key=${process.env.API_KEY}&imgUrl=${image}&topTxt=${topTxt}&botTxt=${botTxt}`, 'makememe.png')
        )

    }
}