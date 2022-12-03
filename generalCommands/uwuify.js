// THIS IS AN EXAMPLE GENERAL COMMAND

const getRandomInt = require('../tools/getRandomInt.js');

var kaomojiJoy = [" (* ^ ω ^)", " (o^▽^o)", " (≧◡≦)", " ☆⌒ヽ(*\"､^*)chu", " ( ˘⌣˘)♡(˘⌣˘ )", " xD"];

function uwuinate(text) {
  if (!text) return false;
  finalText = kaomojiJoy[getRandomInt(kaomojiJoy.length)];
  return finalText;
}

async function run(message){
  return uwuinate(message);
}

module.exports = run;
