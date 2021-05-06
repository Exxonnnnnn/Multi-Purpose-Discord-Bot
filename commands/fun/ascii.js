const figlet = require('figlet');

module.exports = {
    name: 'ascii',
    aliases: [],
    description: 'Turns your specfied text into ascii text in an embed',
    category: 'fun',
    dmOnly: false, // Boolean
    guildOnly: false, // Boolean
    args: true, // Boolean
    usage: '{prefix}ascii <text>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['SEND_MESSAGES'],
    run: ({ message, args }) => {
        figlet.text(args.join(' '), async function (err, data) {
            if (err)
                return message.channel.send('An error occured, please try again!');
            
            if (data.length > 2000)
                return message.channel.send('Please provide text shorter than 2000 characters');

            return message.channel.send(`\`\`\`${data}\`\`\``);
        }) 
    }
}