const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'joke',
    aliases: [],
    description: 'This will use the api to get a random joke and send it in an embed',
    category: 'fun',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: false, // Boolean
    usage: '{prefix}joke',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGES'],
    run: async ({ message }) => {
        const res = await axios({
            method: 'get', // Using a GET method for the api request
            url: 'https://icanhazdadjoke.com/', // Setting the URL to use for the api request
            headers: { 'Accept': 'text/plain' } // Setting the header for the api request
        })
        .catch(() =>
            message.reply('An error has occured whilst fetching that data!')
        );

        if (!res || !res.data)
            return message.channel.send('An error has occured, please try again!');
        
        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setTitle(res.data)
        .setFooter(`Invoked by ${message.author.tag}`)
        .setTimestamp()

        message.channel.send(message.author, { embed, });
    }
}
