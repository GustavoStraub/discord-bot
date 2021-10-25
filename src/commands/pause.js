const execute = (bot, msg, args) => {
 const queue = bot.queues.get(msg.guild.id);
 if(!queue){
   return msg.reply('tem nada tocando, maluco');
 }
 queue.dispatcher.pause();
 return msg.channel.send('musica pausada')
}

module.exports = {
  name: "pause",
  help: 'pausa a musga',
  execute
}