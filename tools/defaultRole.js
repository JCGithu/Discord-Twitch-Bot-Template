async function defaultRole(user, discordData){
  if (discordData.id != user.guild.id) return;
  if (!discordData.roles.default) return;
  for (let i in discordData[server].roles.defaults){
    user.roles.add(discordData[server].roles.defaults[i]);
  }
}

module.exports = defaultRole;