// EXAMPLE OF A TWITCH COMMAND USING GENERAL COMMANDS

const uwuify = require('../../generalCommands/uwuify.js');

async function run(channel, tags, message, client){
  return uwuify(message);
}

module.exports = run;
