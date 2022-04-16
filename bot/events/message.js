const { Message, MessageEmbed, Collection } = require('discord.js');
const pretty = require('pretty-ms');
const prefix = process.env.PREFIX;
const client = require('../index')
/**
    *@param {Message} message
    *@param {String[]} args
*/

const cooldowns = new Collection()

module.exports = async (message) => {

    if (message.channel.type === "dm") return;

    if (message.author.bot) return;

    if (message.content.toLowerCase().startsWith(prefix)) {

        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))


        if (command.botPermissions) {
            if (!message.guild.me.hasPermission(command.botPermissions)) {

                return message.channel.send({
                    embed: {
                        color: 'RED',
                        title: 'Missing Permissions!',
                        description: `<a:red_tick:763061034721607681> I am missing the required permissions - \`${command.botPermissions.join(', ')}\` to run **${command.name}**`
                    }
                })

            }
        }

        if (command.requiredPermissions) {
            if (!message.member.hasPermission(command.requiredPermissions)) {

                return message.channel.send({
                    embed: {
                        color: 'RED',
                        title: 'Missing Permissions!',
                        description: `<a:red_tick:763061034721607681> You are missing the required permissions to run **${command.name}**`
                    }
                })

            }
        }

        if (!command) return;

        if (command.ownerOnly && message.author.id != process.env.OWNER_ID) return reactNo(message);

        if (!cooldowns.has(commandName)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = expirationTime - now;
                const cooldownEmbed = new MessageEmbed()
                    .setTitle(':watch: Woah, slow down :watch:')
                    .setColor('GOLD')
                    .setDescription(`woah chill, you gotta wait ${pretty(timeLeft)} before reusing the \`${command.name}\` command again`)
                return message.channel.send(cooldownEmbed)
            }
        }


        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.run(client, message, args);
        } catch (error) {
            console.error(error);
            message.channel.send({
                title: 'Error',
                color: 'RED',
                description: `There was an error trying to execute that command\n**Need Help? [Join our support server](${process.env.SERVER})**`
            })
        }

    }
}