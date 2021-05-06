const Discord = require ('discord.js')
const schema = require ('../../mongoose/Delete-Logs')
module.exports.config = {
    name: "setdelete",
    aliases: [],
    category: "config",
    dmOnly: false, // Boolean
    guildOnly: true, // Boolean
    args: true, // Boolean
    usage: '<channel>',
    cooldown: 5, //seconds(s)
    guarded: false, // Boolean
    permissions: ["ADMINISTRATOR"],
}

module.exports.run = async (client, message, args) => {

let channel = message.mentions.channels.first()
if (!channel) message.guild.channels.cache.find(u => u.id === args[0])
if (!channel) return message.channel.send('Please make sure you state a valid channel!')

const data = await schema.findOne({
    GuildID: message.guild.id
})

if (data) {

await schema.findOneAndDelete({
    GuildID: message.guild.id
})

message.channel.send('Delete Messages logs have been disabled for this server!\nTo set them again use the command \`>setdelete <channel>\`')

} else if (!data) {

let newData = new schema({
    GuildName: message.guild.name,
    GuildID: message.guild.id,
    ChannelID: channel.id
})

newData.save()
message.channel.send(`${channel} has been set as the message delete logs channel!`)

}}
