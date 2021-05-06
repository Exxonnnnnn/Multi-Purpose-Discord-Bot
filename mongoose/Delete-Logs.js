const { Schema, model } = require('mongoose');

const DeleteSchema = new Schema({
    GuildName: String,
    GuildID: String,
    ChannelID: String
});

module.exports = model('Bot-Delete-Log-Channels', DeleteSchema);