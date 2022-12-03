// EXAMPLE OF A RANDOMISED RESPONSE COMMAND

let data = [
"{user} drives off into the sunset. Maybe we'll see them again one day.",
"{user} turns to smoke, their last smile curling into the wind.",
"{user} has a very important meeting to attend.",
"{user} will be back when we need them most."
];

const getRandomInt = require("../../tools/getRandomInt");

async function run(channel, tags, message, client){
    let user = tags.username
    let quote = data[getRandomInt(data.length)]
    quote = quote.replace('{user}', user);
    return quote;
}

module.exports = run;