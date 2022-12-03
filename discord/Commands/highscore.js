// THIS IS AN EXAMPLE OF A DATABASE COMMAND

async function highscore(message, content, ComfyDB){
    let data = await ComfyDB.Get('highscore');
    return `_The highscore is ${data.highscore}!_`
};

module.exports = highscore;
