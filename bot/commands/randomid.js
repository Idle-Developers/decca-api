const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'randomid',
    description: 'Generates a random id',
    usage: 'randomid',
    aliases: ['r-id'],
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

        fetch(`https://api.decc00n.tk/string/randomid?key=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(json => message.channel.send({
            embed: {
                color: 'GREEN',
                title: 'Result',
                description: json.id
            }
        }));

    }
}