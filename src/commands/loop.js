var loop = false;

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!loop) {
    loop = true;
    return msg.channel.send('loop ativado');
  } else {
    loop = false;
    return msg.channel.send('loop desativado');
  }
}

module.exports = {
  name: "loop",
  help: 'a musga fica em loop',
  execute,
  loop
}