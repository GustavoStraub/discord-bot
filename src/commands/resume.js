const execute = (bot, msg, args) => {
 const queue = bot.queues.get(msg.guild.id);
 if(!queue){
   return msg.reply('tem nada tocando, maluco');
 }
 queue.dispatcher.resume();
 return msg.channel.send('musica despausada')
}

module.exports = {
  name: "resume",
  help: 'despausa a musga',
  execute
}