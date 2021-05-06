const schema = require('../../mongoose/AutoRole'); // Defining the schema that is used in the mongoose database

module.exports = {
    name: 'autorole',
    aliases: ['joinrole', 'arole'],
    description:
        'This will let you make the bot give a role to someone as soon as they join the server, make sure you state a valid role to give the users',
    category: 'config',
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '{prefix}autorole <role>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ['ADMINISTRATOR'],
    run: async ({ message, args }) => {
        const role = message.guild.roles.cache.get(args[0]) ||
            message.guild.roles.cache.find(r => r.name.toLowerCase() === args[0]) ||
            message.mentions.roles.first(); // Defining the role
        
        if (!role)
            return message.channel.send(
                'Please make sure you state a valid role to give to members that join!'
            ); // If a role was not found it will return this message
        
        try {
            await schema.findOneAndUpdate({
                GuildID: message.guild.id
            }, {
                GuildID: message.guild.id,
                GuildName: message.guild.name,
                RoleID: role.id
            }, {
                upsert: true
            }); // Saving the data to the database, we use upsert: true for incase there is no data.
        } catch (err) {
            console.log(err);
            return message.channel.send('An error occured whilst saving the role, please try again!');
        }

        message.channel.send(`The auto role has been set to ${role}!`); // Replying with this message once the data has been saved
    }
}
