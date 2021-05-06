const schema = require('../../mongoose/React-Channel'); // Defining the schema

module.exports = {
    name: 'setreactchannel',
    aliases: [],
    description: 'This will set the channel for the \`reactrole\` channel to fetch the message from. This will allow you to set the react role in that channel.',
    category: 'config',
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '{prefix}setreactchannel <Channel>',
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
            return message.channel.send('An error occured whilst saving the react channel, please try again!');
        }

        message.channel.send(`The react channel has been set to ${channel}`);
    }
}
