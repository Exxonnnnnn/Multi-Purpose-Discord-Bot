const axios = require('axios');
const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed()
.setColor('#36393f')

module.exports = {
    name: 'meme',
    aliases: [],
    description: 'This will get a random meme from the meme api that gets memes from reddit',
    category: 'fun',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '{prefix}meme',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: [],
    run: async ({ message }) => {
        const res = await axios({
            method: 'get', // Using a GET method for the api request
            url: 'http://meme-api.herokuapp.com/gimme', // Setting the URL to use for the apu request
        })
        .catch(() =>
            message.reply('An error has occured whilst fetching that data!')
        );

        let x = 0; // Defining x so that we can use it to loop
        while (x < 1) {
            if (res && res.data && !res.data.nsfw) { // Checking if the meme fetched is not a nsfw meme
                embed
                    .setTitle(res.data.title)
                    .setURL(res.data.postLink)
                    .setImage(res.data.preview[2]) // Setting the embed image as the meme
                    .setFooter(`Pulled from the subreddit: ${res.data.subreddit}`)
                
                message.channel.send(message.author, { embed, });

                x++; // If it was not NSFW then it will add one to x so that is is bigger than 0
            }
        }
    }
}
