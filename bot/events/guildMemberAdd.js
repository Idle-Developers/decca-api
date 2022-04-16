const { MessageAttachment } = require('discord.js');

const bgImage = 'https://cdn.discordapp.com/avatars/737602671208300584/bf783c4f0fac3e0427ae7b99ba862d9c.png'
const topTxt = 'Welcome to the server!'
const txtColor = 'white'

module.exports = async (member) => {

    if (member.guild.id !== '737745064314404864') return;

    const botTxt = `You are the server's ${member.guild.memberCount}th member!`

    const channel = member.guild.channels.cache.get('827632480148258877');

    const welcome = new MessageAttachment(
        `https://api.decc00n.tk/discord/welcome?key=${process.env.API_KEY}&bgImg=${bgImage}&topTxt=${encodeURIComponent(topTxt)}&botTxt=${encodeURIComponent(botTxt)}&avatar=${member.user.displayAvatarURL({ format: 'png' })}&username=${member.user.username}&txtColor=${txtColor}`, 'welcome.png'
    )

    channel.send(welcome);

}