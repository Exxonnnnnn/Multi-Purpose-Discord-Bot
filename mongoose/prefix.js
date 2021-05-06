const { Schema, model } = require('mongoose');

const PrefixSchema = new Schema({
    GuildName: String,
    GuildID: String,
    Prefix: String
});

module.exports = model('Bot-Prefixes', PrefixSchema);