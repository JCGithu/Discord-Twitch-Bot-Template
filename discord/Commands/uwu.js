// THIS IS AN EXAMPLE OF HOW TO USE A GENERAL COMMAND

const uwuify = require('../../generalCommands/uwuify.js');

async function run(message, content, ComfyDB){
  return uwuify(message);
}

module.exports = run;
