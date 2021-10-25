const execute = (bot, msg, args) => {
 const queue = bot.queues.get(msg.guild.id);
 if(!queue){
   return msg.reply('tem nada tocando, maluco');
 }
 queue.songs = [];
 bot.queues.set(msg.guild.id, queue);
 queue.dispatcher.end()
 return msg.channel.send('Musica stopada, falous!')
}

module.exports = {
  name: "stop",
  help: 'stopa as musicas (tira tudo da fila)',
  execute
}