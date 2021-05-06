const axios = require('axios'); // Module used for the api request
const { MessageEmbed } = require('discord.js');
const ApiKey = require('../../configs/Api-Keys.json'); // Make sure you have your api key pasted in this folder else it will error

module.exports = {
    name: 'cat',
    aliases: [],
    description: 'This command will display a picture of a cat that is pulled from the [Cat Api](https://thecatapi.com)',
    category: 'animals',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '{prefix}cat',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGES'],
    run: async({ message }) => {
        const res = await axios({
            method: 'get', // Using a GET method for the api request
            url: 'https://api.thecatapi.com/v1/images/search', // Defining the URL to pull the request from, this will get the photo from that URL
            headers: { 'api-key': `${ApiKey.CatKey}` } // Defining the header for the api key that you put into the api key file
        })
        .catch(() =>
            message.reply('An error has occured whilst fetching that data!')
        );

        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setImage(res.data[0].url)
        .setFooter(`Invoked by ${message.author.tag}`)
        .setTimestamp()

        message.channel.send(message.author, { embed, });
    }
}