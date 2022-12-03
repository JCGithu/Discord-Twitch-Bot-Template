module.exports = (fs, path, redeemData) => {

  let output = {
    commands: [],
    loop: 1,
    prevMsg: '',
    redeems: {}
  }


  output.commands = [];
  output.loop = 1;
  output.prevMsg = '';

  let Commdir = `./twitch/Commands`
  let Commfiles = fs.readdirSync(Commdir);
  for (let Commfile of Commfiles) {
    output.commands.push(path.parse(Commfile).name);
  }

  if (!redeemData) return output;

  let Reddir = `./twitch/Redeems`;
  let redeemList = Object.keys(redeemData);
  for (let red of redeemList) {
    output.redeems[red].path = path.parse(Reddir + '/' + redeemData[red]);
  }

  return output;
};
