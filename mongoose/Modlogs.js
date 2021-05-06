const { Schema, model } = require('mongoose');

const Schema = new Schema({
    GuildName: String,
    GuildID: String,
    ChannelID: String
});

module.exports = model('Bot-Mod-Logs-Channels', Schema);