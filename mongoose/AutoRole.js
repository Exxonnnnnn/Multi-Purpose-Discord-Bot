const { Schema, model } = require('mongoose');

const AutoSchema = new Schema({
    GuildName: String,
    GuildID: String,
    RoleID: String
});

module.exports = model('Bot-AutoRoles', AutoSchema);