const { Schema, model } = require('mongoose');

const JoinSchema = new Schema({
    GuildName: String,
    GuildID: String,
    ChannelID: String
});

module.exports = model('Bot-Join-Logs', JoinSchema);