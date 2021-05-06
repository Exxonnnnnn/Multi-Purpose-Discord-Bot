const axios = require('axios'); // Defining the module for the api request
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'fox',
    aliases: [],
    category: 'animals',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '{prefix}fox',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGES'],
    run: async ({ message }) => {
        const res = await axios({
            method: 'get', // Using a GET method for the api request
            url: 'https://randomfox.ca/floof/', // Defining the URL to pull the request from, this will get the photo from that URL
        })
        .catch(() =>
            message.reply('An error has occured whilst fetching that data!')
        );

        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setTitle('Your Fox Image')
        .setImage(res.data[0].url)
        .setFooter(`Invoked by ${message.author.tag}`)
        .setTimestamp()

        message.channel.send(message.author, { embed, });
    }
}
