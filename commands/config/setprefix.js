const schema = require('../../mongoose/prefix'); // Defining the schema

module.exports = {
    name: 'setprefix',
    aliases: [],
    description:
        'This will allow you to set the prefix for the message guild, this will update the prefix so all commands work with that prefix instead of \`>\`.',
    category: 'config',
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '{prefix}setprefix <prefix>',
    cooldown: 10, //seconds(s)
    guarded: false, // Boolean
    permissions: ['ADMINISTRATOR'],
    run: async ({ message, args, prefix }) => {
        const newPrefix = args[0];
        if (!newPrefix || newPrefix === prefix)
            return message.channel.send('Please make sure you provide a **new** prefix!'); // If they don't provide a prefix or they try use the same prefix then this will be sent.
        
        try {
            await schema.findOneAndUpdate({
                GuildID: message.guild.id
            }, {
                GuildID: message.guild.id,
                GuildName: message.guild.name,
                Prefix: newPrefix
            }, {
                upsert: true
            }); // Saving the data to the database, we use upsert: true for incase there is no data.
        } catch (err) {
            console.log(err);
            return message.channel.send('An error occured whilst saving the prefix, please try again!');
        }

        message.channel.send(`${guild.name}'s prefix has now been set to \`${newPrefix}\``);
    }
}
