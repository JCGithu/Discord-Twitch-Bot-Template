module.exports = (fs, path, serverID) => {
  let dir = `./discord/Commands`
  let files = fs.readdirSync(dir);
  let output = {
    id: serverID,
    commands: [],
    roles: {}
  };
  for (let file of files) {
    output.commands.push(path.parse(file).name);
  }
  let roles = require(`../discord/roles.json`);
  output.roles = roles;


  return output;
};
