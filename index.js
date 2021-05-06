/*
██╗███╗░░░███╗██████╗░░█████╗░██████╗░████████╗██╗███╗░░██╗░██████╗░
██║████╗░████║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║████╗░██║██╔════╝░
██║██╔████╔██║██████╔╝██║░░██║██████╔╝░░░██║░░░██║██╔██╗██║██║░░██╗░
██║██║╚██╔╝██║██╔═══╝░██║░░██║██╔══██╗░░░██║░░░██║██║╚████║██║░░╚██╗
██║██║░╚═╝░██║██║░░░░░╚█████╔╝██║░░██║░░░██║░░░██║██║░╚███║╚██████╔╝
╚═╝╚═╝░░░░░╚═╝╚═╝░░░░░░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚═════╝░

███╗░░░███╗░█████╗░██████╗░██╗░░░██╗██╗░░░░░███████╗░██████╗
████╗░████║██╔══██╗██╔══██╗██║░░░██║██║░░░░░██╔════╝██╔════╝
██╔████╔██║██║░░██║██║░░██║██║░░░██║██║░░░░░█████╗░░╚█████╗░
██║╚██╔╝██║██║░░██║██║░░██║██║░░░██║██║░░░░░██╔══╝░░░╚═══██╗
██║░╚═╝░██║╚█████╔╝██████╔╝╚██████╔╝███████╗███████╗██████╔╝
╚═╝░░░░░╚═╝░╚════╝░╚═════╝░░╚═════╝░╚══════╝╚══════╝╚═════╝░
*/

const { Client, Collection } = require('discord.js'); // Defining Discord as the discord.js module
const fs = require('fs'); // Defining FS needed for the file management
const { connect } = require('mongoose'); // Defining mongoose
let ascii = require('ascii-table'); // Defining ascii for the file management events
const { Player } = require('discord-player'); // Defining Player as the discord-player
const schema = require('./mongoose/prefix'); // Defining the prefix schema
const MessageDelete = require('./events/MessageDelete'); // Defining the MessageDelete event
const guildMemberAdd = require('./events/GuildMemberAdd'); // Defining the memberadd event
const guildMemberRemove = require('./events/GuildMemberRemove'); // Defining the member remove event
const messageReactionAdd = require('./events/ReactionAdd'); // Defining the reaction add event
const ModLogs = require('./events/Server-Logs'); // Defining the modlogs events
const config = require('./configs/config.json'); // Defining the config.json file

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); // Defining the discord client aswell as the partials needed
client.player = new Player(client); // Defining client.player as a new player

/*

██████╗░███████╗░█████╗░██████╗░██╗░░░██╗  ███████╗██╗░░░██╗███████╗███╗░░██╗████████╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗░██╔╝  ██╔════╝██║░░░██║██╔════╝████╗░██║╚══██╔══╝
██████╔╝█████╗░░███████║██║░░██║░╚████╔╝░  █████╗░░╚██╗░██╔╝█████╗░░██╔██╗██║░░░██║░░░
██╔══██╗██╔══╝░░██╔══██║██║░░██║░░╚██╔╝░░  ██╔══╝░░░╚████╔╝░██╔══╝░░██║╚████║░░░██║░░░
██║░░██║███████╗██║░░██║██████╔╝░░░██║░░░  ███████╗░░╚██╔╝░░███████╗██║░╚███║░░░██║░░░
╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░  ╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░
*/

client.on("ready", () => {
    console.log(
        `Logged in as ${client.user.tag}. Bot Invite: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
    );

    MessageDelete(client);
    guildMemberAdd(client);
    guildMemberRemove(client);
    ModLogs(client);
    messageReactionAdd(client);
})

/*

░█████╗░░█████╗░███╗░░██╗███╗░░██╗███████╗░█████╗░████████╗██╗░█████╗░███╗░░██╗░██████╗
██╔══██╗██╔══██╗████╗░██║████╗░██║██╔════╝██╔══██╗╚══██╔══╝██║██╔══██╗████╗░██║██╔════╝
██║░░╚═╝██║░░██║██╔██╗██║██╔██╗██║█████╗░░██║░░╚═╝░░░██║░░░██║██║░░██║██╔██╗██║╚█████╗░
██║░░██╗██║░░██║██║╚████║██║╚████║██╔══╝░░██║░░██╗░░░██║░░░██║██║░░██║██║╚████║░╚═══██╗
╚█████╔╝╚█████╔╝██║░╚███║██║░╚███║███████╗╚█████╔╝░░░██║░░░██║╚█████╔╝██║░╚███║██████╔╝
░╚════╝░░╚════╝░╚═╝░░╚══╝╚═╝░░╚══╝╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░╚════╝░╚═╝░░╚══╝╚═════╝░
*/

client.login(config.token);
connect(config.MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

/*

███████╗██╗██╗░░░░░███████╗  ██╗░░██╗░█████╗░███╗░░██╗██████╗░██╗░░░░░███████╗██████╗░░██████╗
██╔════╝██║██║░░░░░██╔════╝  ██║░░██║██╔══██╗████╗░██║██╔══██╗██║░░░░░██╔════╝██╔══██╗██╔════╝
█████╗░░██║██║░░░░░█████╗░░  ███████║███████║██╔██╗██║██║░░██║██║░░░░░█████╗░░██████╔╝╚█████╗░
██╔══╝░░██║██║░░░░░██╔══╝░░  ██╔══██║██╔══██║██║╚████║██║░░██║██║░░░░░██╔══╝░░██╔══██╗░╚═══██╗
██║░░░░░██║███████╗███████╗  ██║░░██║██║░░██║██║░╚███║██████╔╝███████╗███████╗██║░░██║██████╔╝
╚═╝░░░░░╚═╝╚══════╝╚══════╝  ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░╚══════╝╚══════╝╚═╝░░╚═╝╚═════╝░
*/

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};


//Command Handler
client.commands = new Collection(); // Defining the client commands for the commands folder
client.aliases = new Collection(); // Defining the client aliases for the commands folder
const cooldowns = new Collection();

let table = new ascii("Bot Commands"); // Defining a new table with the title "Bot Commands"
table.setHeading("Command", "Load Status"); // Adding headers to the table for the bot commands

fs.readdirSync("./commands/").forEach(dir => { // Reading all files in the commands folder
    const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js")); // Defining commands and filtering the files to only get the names 
    for (let file of commands) {  // looping through the files
        let pull = require(`./commands/${dir}/${file}`); 
        if (pull.name) { 
            client.commands.set(pull.name, pull); // setting the client commands as the command name 
            table.addRow(file, 'Ready!');  // adding a row to the table to say the file name and the load status
        } else {
            table.addRow(file, `error -> missing a help.name, or help.name is not a string.`); // Adding another row to the table stating the name of the file and the error
            return; 
        }
        pull.aliases.forEach(alias => { 
            client.aliases.set(alias, pull.name) // setting the command aliases as the command aliases
          })
        }
})
console.log(table.toString()); //showing the table

/*

███╗░░░███╗███████╗░██████╗░██████╗░█████╗░░██████╗░███████╗  ███████╗██╗░░░██╗███████╗███╗░░██╗████████╗
████╗░████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝░██╔════╝  ██╔════╝██║░░░██║██╔════╝████╗░██║╚══██╔══╝
██╔████╔██║█████╗░░╚█████╗░╚█████╗░███████║██║░░██╗░█████╗░░  █████╗░░╚██╗░██╔╝█████╗░░██╔██╗██║░░░██║░░░
██║╚██╔╝██║██╔══╝░░░╚═══██╗░╚═══██╗██╔══██║██║░░╚██╗██╔══╝░░  ██╔══╝░░░╚████╔╝░██╔══╝░░██║╚████║░░░██║░░░
██║░╚═╝░██║███████╗██████╔╝██████╔╝██║░░██║╚██████╔╝███████╗  ███████╗░░╚██╔╝░░███████╗██║░╚███║░░░██║░░░
╚═╝░░░░░╚═╝╚══════╝╚═════╝░╚═════╝░╚═╝░░╚═╝░╚═════╝░╚══════╝  ╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░

*/

client.on("message", async message => {
    if (message.author.bot) return;

    const data = await schema.findOne({
        GuildID: message.guild.id
    });

    const prefix = data && data.Prefix ? data.Prefix : config.prefix;


    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/g);
    if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
    const commandName = args.shift().toLowerCase();

    const cmd = client.commands.get(commandName) ||
        client.commands.find(
            cmd => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!cmd) return;

    try {
        //+ cooldown 1, //seconds(s)
        if (!cooldowns.has(cmd.name)) {
            cooldowns.set(cmd.name, new Collection());
        }
            
        const now = Date.now();
        const timestamps = cooldowns.get(cmd.name);
        const cooldownAmount = (cmd.cooldown || 3) * 1000;
            
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.name}\` command.`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        //+ args: true/false,
        if (cmd.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            //+ usage: '<> <>',
            if (cmd.usage) {
                reply += `\nThe proper usage would be: \`${cmd.usage.replace(/{prefix}/gi, prefix)}\``;
            }
            
            return message.channel.send(reply);
        };
                 
        //+ permissions: [""],
        if (cmd.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(cmd.permissions)) {
                return message.reply('You can not do this!');
            }
        }

        //+ guildOnly: true/false,
        if (cmd.guildOnly && !message.guild) {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        //+ dmOnly: true/false,
        if (cmd.dmOnly && message.guild) {
            return message.reply('I can\'t execute that command inside the server!');
        }

        if (cmd.guarded && message.author.id !== config.DevID) {
            return message.reply('You can not do this!');
        }

        cmd.run({ client, message, args });
    } catch (err) {    
        message.reply(`There was an error in the console.`);
        console.log(err);
    }
})