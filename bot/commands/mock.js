const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'mock',
    description: 'Mock some text',
    usage: 'mock <Text>',
    aliases: ['rev'],
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

        const text = args.join(' ');

        if (!text) return message.channel.send({
            embed: {
                color: 'RED',
                title: 'Error!',
                description: 'You need to provide some text!'
            }
        })

        if (text.length > 1000) return message.channel.send({
            embed: {
                color: 'RED',
                title: 'Error!',
                description: 'That text is too long!'
            }
        })

        fetch(`https://api.decc00n.tk/string/mock?key=${process.env.API_KEY}&string=${encodeURIComponent(text)}`)
        .then(res => res.json())
        .then(json => message.channel.send({
            embed: {
                color: 'GREEN',
                title: 'Result',
                description: json.response
            }
        }));

    }
}