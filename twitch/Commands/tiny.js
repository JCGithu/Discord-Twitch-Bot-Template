// EXAMPLE OF A COMMAND USING EXTERNAL LIBRARIES

const tiny = require('tiny-text');

async function run(channel, tags, message, client){
    message = message.replace('!tiny', "");
    if (!message.length) return '/me No message to tiny :(';
    return tiny(message);
}

module.exports = run;