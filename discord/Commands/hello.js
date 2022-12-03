// THIS IS AN EXAMPLE OF A RANDOM RESPONSE COMMAND

const getRandomInt = require("../../tools/getRandomInt");

let data = [
    "hello yourself ;)",
    "sup.",
    "Woah, hey there buddy!",
    "Well..... hello",
    "Oh my god you're like soooo funny *curls hair around finger*",
    "Please keep this professional",
    "Bye!"
]

async function run (){
    return data[getRandomInt(data.length)];
}

module.exports = run;