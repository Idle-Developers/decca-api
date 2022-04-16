const { MessageAttachment } = require('discord.js');

const bgImage = 'https://cdn.discordapp.com/avatars/737602671208300584/bf783c4f0fac3e0427ae7b99ba862d9c.png'
const topTxt = 'Bye'
const botTxt = '*insert crying emoji*'
const txtColor = 'white'

module.exports = async (member) => {

    if (member.guild.id !== '737745064314404864') return;

    const channel = member.guild.channels.cache.get('827632480148258877');

    const bye = new MessageAttachment(
        `https://api.decc00n.tk/discord/welcome?key=${process.env.API_KEY}&bgImg=${bgImage}&topTxt=${encodeURIComponent(topTxt)}&botTxt=${encodeURIComponent(botTxt)}&avatar=${member.user.displayAvatarURL({ format: 'png' })}&username=${member.user.username}&txtColor=${txtColor}`, 'bye.png'
    )

    channel.send(bye);
    
}