const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'meowfact',
    aliases: [],
    description: 'This will get a random fact about cats from the api',
    category: 'fun',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '{prefix}meowfact',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGE'],
    run: async ({ message }) => {
        const res = await axios({
            method: 'get', // Using a GET method for the api request
            url: 'https://meowfacts.herokuapp.com', // Setting the URL to use for the api request
        })
        .catch(() =>
            message.reply('An error has occured whilst fetching that data!')
        );

        if (!res || !res.data)
            return message.channel.send('An error has occured, please try again!');
        
        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setTitle(res.data.data[0])
        .setFooter(`Invoked by ${message.author.tag}`)
        .setTimestamp()

        message.channel.send(message.author, { embed, });
    }
}
