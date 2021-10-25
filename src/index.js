const Discord = require('discord.js');
const TOKEN = process.env.TOKEN;
const fs = require('fs');
const path = require('path');
const prefix = '-'

const bot = new Discord.Client();
bot.commands = new Discord.Collection()
bot.queues = new Map()


const commandFiles = fs.readdirSync(path.join(__dirname, "/commands"))
  .filter(filename => filename.endsWith('.js'))

for (let filename of commandFiles) {
  const command = require(`./commands/${filename}`)
  bot.commands.set(command.name, command)
}

bot.login('NzA3MzQxMzMyNzE2NDUzOTQ5.XrHbuw.ySbTRpZcwqJ7xgub92llIE1oBc0');


bot.on('ready', () => {
  console.info(`Logado como ${bot.user.username}!`);
});

bot.once('ready', () => {
  console.log('Pai ta on!');
});
bot.once('reconnecting', () => {
  console.log('Reconectando!');
});
bot.once('disconnect', () => {
  console.log('Disconectado!');
});

bot.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(' ')
  const command = args.shift()

  try {
    bot.commands.get(command).execute(bot, msg, args)
  } catch (err) {
    return msg.reply('comando inválido!')
  }
})