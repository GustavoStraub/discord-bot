const execute = (bot, msg, args) => {
  let string = '**=========== AJUDA ===========**\n\n';
  bot.commands.forEach(command => {
    if (command.help) {
      string += `**${command.name}**: ${command.help}\n`
    }
  });
  return msg.channel.send(string)
}

module.exports = {
  name: "help",
  hwlp: 'exibe os comandos',
  execute
}