const schema = require('../../mongoose/Delete-Logs'); // Defining the schema for the Delete logs command

module.exports = {
    name: 'setdelete',
    aliases: [],
    description:
        'This will allow you to set a channel to send a message to when a message is deleted in the guild. This will tell you what the message content was and who the author was.',
    category: 'config',
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '{prefix}setdelete <channel>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['ADMINISTRATOR'],
    run: async ({ message, args }) => {
        const channel = message.guild.channels.cache.get(args[0]) ||
            message.guild.channels.cache.find(c => c.name === args[0]) ||
            message.mentions.channels.first(); // Defining the channel
        
        if (!channel ||
            channel.type !== 'text' ||
            channel.type !== 'news'
        )
            return message.channel.send('Please make sure you state a valid text channel!'); // If a channel was not found then it will return and send this message
        
        try {
            await schema.findOneAndUpdate({
                GuildID: message.guild.id
            }, {
                GuildID: message.guild.id,
                GuildName: message.guild.name,
                ChannelID: channel.id
            }, {
                upsert: true
            }); // Saving the data to the database, we use upsert: true for incase there is no data.
        } catch (err) {
            console.log(err);
            return message.channel.send('An error occured whilst saving the message delete channel, please try again!');
        }

        message.channel.send(`The message delete channel has been set to ${channel}`);
    }
}
