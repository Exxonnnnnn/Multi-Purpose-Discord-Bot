const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    description: 'Flip a coin and get an answer of either heads or tails',
    category: 'fun',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '{prefix}coinflip',
    cooldown: 3, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGES'],
    run: ({ message }) => {
        const coin = ['heads', 'tails'];

        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setTitle('Coin Flip Result')
        .setDescription(`The coin was flipped and the result is **${coin[Math.floor(Math.random() * coin.length)]}**`) // Setting the embed description as the coinflip result
        .setFooter(`Invoked by ${message.author.tag}`)

        message.channel.send(message.author, { embed, });
    }
}
