// EXAMPLE OF A TWITCH COMMAND LINKING TO DISCORD

const getRandomInt = require("../../tools/getRandomInt");

let data = [
    "It's alive!!!",
    "1.2. 1.2. Is this this on?",
    "Live-ing & vibing",
]

async function run(channel, tags, message, client){
    
    // Only broadcaster can run this command
    if (!tags.badges.broadcaster) return 'Only the broadcaster can use this command.';
    
    // Only broadcaster and mods can run this command
    //if (!tags.badges.broadcaster && !tags.badges.moderator) return 'Only mods can use this command.';

    let channelName = channel.substring(1);
    
    let targetDiscordChannelID = ``;
    let targetDiscordChannelRole = ""

    client.channels.cache
    .get(targetDiscordChannelID)
    .send(`${targetDiscordChannelRole} ${data[getRandomInt(data.length)]} https://twitch.tv/${channelName}`);
return 'Discord notified!'
}

module.exports = run;