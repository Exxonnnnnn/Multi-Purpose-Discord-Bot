const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pokemon',
    aliases: [],
    description: 'This command will display some information about the specified pokemon',
    category: 'fun',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: true, // Boolean
    usage: '{prefix}pokemon <pokemon>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGES'],
    run: async ({ message, args }) => {
        const res = await axios({
            method: 'get', // Using a GET method for the api request
            url: `https://pokeapi.co/api/v2/pokemon/${args.join(" ")}` // Setting the URL for the request and setting the pokemon as your arguments
        })
        .catch(() =>
            message.reply('An error has occured, please make sure your argument is a valid pokemon!')
        );

        if (!res || !res.data)
            return message.channel.send('An error has occured, please make sure your argument is a valid pokemon!');
        
        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setTitle(`Info for ${res.data.species.name}`) // Setting the title as the pokemon name
        .setColor(`#36393f`)
        .setImage(res.data.sprites.front_default) // Setting the image as an image of the specifed pokemon
        .addFields(
            { name: 'Name', value: res.data.species.name, inline: true },
            { name: 'Height', value: res.data.height, inline: true },
            { name: 'Weight', value: res.data.weight, inline: true },
        ) // Adding fields for the pokemon data

        message.channel.send(message.author, { embed, });
    }
}
