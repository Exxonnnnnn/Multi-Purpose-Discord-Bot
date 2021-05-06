const { Schema, model } = require('mongoose');

const ChannelSchema = new Schema({
    GuildName: String,
    GuildID: String,
    ChannelID: String
});

module.exports = model('Bot-React-Channels', ChannelSchema);