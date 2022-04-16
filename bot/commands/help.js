const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js')
const pretty = require('pretty-ms')

module.exports = {
    name: 'help',
    description: 'Displays a list of all the commands',
    usage: 'help [command]',
    aliases: ['h', 'commands'],
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

        const prefix = process.env.PREFIX;

        const { commands } = client;

        const data = [];

        const funCmds = commands.filter(cmd => cmd.category === 'Fun').map(c => `\`${c.name}\``).join(', ');
        const infoCmds = commands.filter(cmd => cmd.category === 'Info').map(c => `\`${c.name}\``).join(', ');

        if (!args.length) {

            const helpEmbed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle('My Commands')
                .addField('Information', infoCmds)
                .addField('Fun', funCmds)

            data.push(helpEmbed)

            message.channel.send(data)

        } else {

            const name = args[0];
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command && name) {
                return message.channel.send({
                    embed: {
                        title: 'Command Not Found',
                        color: 'RED',
                        description: `Couldn\'t find \`${name}\``,
                    }
                })
            }

            if (!command) return;

            if (command.ownerOnly && message.author.id != process.env.OWNER_ID) return;

            let cdInMs = command.cooldown * 1000;

            const embed = new MessageEmbed()
            embed.setThumbnail(client.user.displayAvatarURL())
            embed.setTitle(`Command | ${command.name}`)
            embed.setColor("BLUE")

            if (command.aliases.length) embed.addField('Aliases: ', `${command.aliases.join(' | ')}`);
            if (command.description) embed.addField('Description: ', `${command.description}`);
            if (command.usage) embed.addField('Usage: ', `${prefix}${command.usage}`);
            if (command.requiredPermissions.length) embed.addField('Permission(s) Needed', `${command.requiredPermissions.map(p => capitalizeFirstLetter(p).split('_').join(' ')).join(', ')}`)
            if (command.botPermissions.length) embed.addField('Bot Permissions Needed', `${command.botPermissions.map(p => capitalizeFirstLetter(p).split('_').join(' ')).join(', ')}`)

            if (command.cooldown) embed.addField('Cooldown: ', `${pretty(cdInMs) || '3 seconds'}`);
            embed.addField('Keys', '`<>` Required\n`[]` Optional')

            data.push(embed)

            message.channel.send(data, { split: true });

        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}