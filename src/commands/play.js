const search = require('yt-search')
const ytdl = require('ytdl-core-discord')
const loop = require('./loop').loop;

const execute = async (bot, msg, args) => {
  const s = args.join(' ')
  const queue = bot.queues.get(msg.guild.id);
  try {
    if (s.includes('https://www.youtube.com/')) {
      if (queue) {
        queue.songs.push(s);
        bot.queues.set(msg.guild.id, queue);
        msg.channel.send(`Adicionado: ${s}`)
      } else {
        playSong(bot, msg, s)
      }
    } else {
      search(s, (err, res) => {
        if (err) {
          console.log(err)
          msg.channel.send('Deu ruim!')
        } else if (res && res.videos.length > 0) {
          const song = res.videos[0].url;
          if (queue) {
            queue.songs.push(song);
            bot.queues.set(msg.guild.id, queue);
            ytdl.getInfo(song).then(info => {
              msg.channel.send(`Adicionado: ${info.videoDetails.title}`);
            })
          } else {
            playSong(bot, msg, song);
          }
        } else {
          return msg.channel.send('encontrei nada não')
        }
      })
    }
  } catch (err) {
    console.error(err);
  }
}

const playSong = async (bot, msg, song) => {
  let queue = bot.queues.get(msg.member.guild.id);
  if (!song) {
    if (queue) {
      queue.connection.disconnect();
      return bot.queues.delete(msg.member.guild.id);
    }
  }
  if (!msg.member.voice.channel) {
    return msg.reply(
      "Tem que ta num chat de voz"
    );
  }
  if (!queue) {
    const conn = await msg.member.voice.channel.join();
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };

    ytdl.getInfo(queue.songs[0]).then(info => {
      msg.channel.send(`Tocando: ${info.videoDetails.title}`);
    })
  }
  queue.dispatcher = await queue.connection.play(
    await ytdl(song, { highWaterMark: 1 << 25, filter: "audioonly" }),
    {
      type: "opus",
    }
  );
  queue.dispatcher.on("finish", () => {

    queue.songs.shift();
    playSong(bot, msg, queue.songs[0]);
    ytdl.getInfo(queue.songs[0]).then(info => {
      msg.channel.send(`Tocando: ${info.videoDetails.title}`);
    })
  });
  bot.queues.set(msg.member.guild.id, queue);
};

module.exports = {
  name: "p",
  help: "Toca uma musga",
  execute,
  playSong
}