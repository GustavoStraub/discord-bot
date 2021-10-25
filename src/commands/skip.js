const PlaySong = require('./play').playSong;
const ytdl = require('ytdl-core-discord')

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("Tem nada tocando, maluco");
  }
  queue.songs.shift();
  bot.queues.set(msg.guild.id, queue);
  PlaySong(bot, msg, queue.songs[0]);
  ytdl.getInfo(queue.songs[0]).then(info => {
    msg.channel.send(`Tocando agora: ${info.videoDetails.title}`);
  })
};

module.exports = {
  name: "skip",
  help: 'skipa a musga',
  execute
}