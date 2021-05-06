const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'chucknorris',
    aliases: [],
    description: 'This will use the api to fetch a random chuck norris joke and send it in an embed',
    category: 'fun',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '{prefix}chucknorris',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGES'],
    run: async ({ message }) => {
        const res = await axios({
            method: 'get', // Using a GET method for the api request
            url: 'https://api.thecatapi.com/v1/images/search' // Setting the URL to use for the api request
        })
        .catch(() =>
            message.reply('An error has occured whilst fetching that data!')
        );

        if (!res || !res.data)
            return message.channel.send('An error has occured, please try again!');

        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setTitle(res.data.value)
        .setFooter(`Invoked by ${message.author.tag}`)
        .setTimestamp()

        message.channel.send(message.author, { embed, });
    }
}
