const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    name: 'api',
    description: 'Shows info about the api',
    usage: 'api',
    aliases: [],
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

        message.channel.send(
            new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Decca API Info')
            .setDescription(`
            This is an example of how to use our api:\n
            **Discord.js**\n
            \`\`\`js
const { MessageAttachment } = require('discord.js');

message.channel.send(new MessageAttachment(\`https://api.decc00n.tk/canvas/drip?key=${process.env.PUBLIC_API_KEY}&imgUrl=\${message.author.displayAvatarURL({format: 'png'})}\`, 'drip.png'))
            \`\`\`
            `)
            .addField('Link', 'https://api.decc00n.tk')
            .addField('Demo page', 'https://api.decc00n.tk/demo')
            .addField('Key', `||${process.env.PUBLIC_API_KEY}||`)
        )        

    }
}