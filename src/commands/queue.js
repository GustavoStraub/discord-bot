const ytdl = require('ytdl-core-discord');

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply('sem nada na fila');
  }

  let num = 1
  queue.songs.forEach(song => {
    ytdl.getInfo(song).then(info => {
      msg.channel.send(`
      ${num}. ${(info.videoDetails.title)}
      `)
      num++
    })
  });
}

module.exports = {
  name: "queue",
  help: 'ver a lista de musga',
  execute
}