const { MessageEmbed } = require('discord.js');

let answers = [
    'As i see it, yes.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again',
    'Don\'t count on it.',
    'It is certain.',
    'It is decidedly so.',
    'Most Likely',
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Outlook good',
    'Reply hazy, try again',
    'Signs point to yes',
    'Very doubtful',
    'Without a doubt',
    'Yes',
    'Yes- Definitely',
    'You may rely on it'
] // Defining the array for the answers

module.exports = {
    name: '8ball',
    aliases: [],
    description: 'This command will let the bot give you a response on a question that comes from an 8Ball.',
    category: 'fun',
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '{prefix}8ball <Question>',
    cooldown: 3, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGES'],
    run: ({ message }) => {
        let response = responses[Math.floor(Math.random() * answers.length)];

        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setTitle('8ball response')
        .setDescription(response)
        
        message.channel.send(message.author, { embed, });
    }
}