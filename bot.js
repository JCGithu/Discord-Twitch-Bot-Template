require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const tmi = require('tmi.js');

// DATABASE SETUP
const ComfyDB = require( "comfydb" );
const DBURI = ``

//Tools
const getTwitchData = require('./tools/getTwitchData.js');
const getDiscordData = require('./tools/getDiscordData.js');
let chatQueue = require('./tools/queue');

// OPTIONAL TOOLS

// // Keep track of a streak in Twitch chat
const chatStreak = require('./tools/chatStreak');

// // Set roles via reacting to a message
const roleChange = require('./tools/roleChange.js');

// // Give users a default role when they join the server
const defaultRole = require('./tools/defaultRole');


// Pull Twitch and Discord data
const twitchChannel = ['YOUR CHANNEL']; 
const twitchData = getTwitchData(fs, path, {"CHANNELPOINTCODE": "exampleRedeem"});
const discordData = getDiscordData(fs, path, "SERVER ID");

const twitch = new tmi.Client({
  options: { debug: false, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: process.env.TWITCHUSER,
    password: process.env.OAUTH,
  },
  channels: twitchChannel
});

//Function Start
client.on('ready', async(twitch) => {
  console.log('Discord bot is ready! ✅');

  // CONNECT TO DATABASE (You can comment out if you don't need one)
  //await ComfyDB.Connect( { url: DBURI, dbname: "ComfyDB" } );
  //let dbRunning = ComfyDB.IsConnected();
  //if (dbRunning === true) console.log('Database is ready! ✅');

  twitch.connect().catch(console.error);
  twitch.on("connected", () => {console.log('Twitch bot is ready! ✅')});

  twitch.on('message', async (channel, tags, message, self) => {
    if (self) return;
    let channelName = channel.substring(1);
    let command = message.substring(1).toLowerCase().split(' ')[0];

    //COMMANDS
    if (message.charAt(0) === '!'){
      for (let cc in twitchData.commands){
        if (command !== twitchData.commands[cc]) continue;
        let codeToRun = require(`./twitch/${command}`);
        console.log(`Twitch: !${command} run by ${tags.username}`);
        chatQueue.push(codeToRun(channel, tags, message, client, ComfyDB), function(output) {
          twitch.say(channel,output)
        });
        return;
      }
    }

    //REDEEMS
    if (tags['custom-reward-id']){
      let redeemList = Object.keys(twitchData.redeems);
      for (let r in redeemList){
        if (tags['custom-reward-id'] !== r) continue;
        let codeToRun = require(twitchData.redeems[r].path);
        console.log(`Twitch: !${twitchData.redeems[r].name} run by ${tags.username}`);  
        chatQueue.push(codeToRun(channel, tags, message, client, ComfyDB), function(output) {
          twitch.say(channel,output)
        });
        return;
      }
    }
  
    // CHAT STREAK
    chatStreak(twitchData, twitch, channel, channelName, message);
  });
});

//DISCORD
client.on('guildMemberAdd', (user) => {
  // Add a default role to a user when they join the server
  defaultRole(user, discordData);
  // Write in Twitch when someone joins Discord;
  twitch.say('#YOURCHANNEL', `${user.username} joined the Discord! Hi!`);
});


client.on('message', async (msg) => {
  if (msg.author.bot || discordData.id != msg.guild.id) return;
  // COMMANDS
  if (msg.content.charAt(0) != '!') return;
  let command = msg.content.substring(1).toLowerCase().split(' ')[0];
  for (let i in discordData.commands){
    let commandName = discordData.commands[i];
    if (command != commandName) continue;
    let codeToRun = require(`./discord/Commands/${commandName}`);
    console.log(`Discord: !${commandName} run by ${msg.member.user.username}`); 
    chatQueue.push(codeToRun(msg.content, msg, ComfyDB), function(output) {
      msg.channel.send(output);
    });
  }
});

//EMOTE ROLE CHANGING
client.on('messageReactionAdd', async (reaction, user) => {
  roleChange(reaction, user, true, client, discordData);
});

client.on('messageReactionRemove', async (reaction, user) => {
  roleChange(reaction, user, false, client, discordData);
});

client.login(process.env.DISCORD_TOKEN);
