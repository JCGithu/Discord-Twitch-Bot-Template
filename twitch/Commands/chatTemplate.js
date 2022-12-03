// EXAMPLE OF A BASIC RESPONSE COMMAND

async function run(channel, tags, message, client){
    return `${tags.username} is trying to get my attention.`
}   

module.exports = run;