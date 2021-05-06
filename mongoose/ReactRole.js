const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
    GuildName: String,
    GuildID: String,
    MessageID: String,
    RoleID: String,
    ReactID: String,
    ReactName: String
});

module.exports = model('Bot-React-Roles', RoleSchema);