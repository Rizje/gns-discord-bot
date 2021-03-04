const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns"],
  category: "mod",
  usage: "<@user>",
  description: "Reset warnings of specified user.",
  run: async (client, message, args) => {
    
    
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, you cannot execute this command.`)
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send(`**${message.author.username}**, please mention the person who you want to reset warns.`)
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send(`**${message.author.username}**, bots cant be warned.`)
    }
    
    if(message.author.id === user.id) {
      return message.channel.send(`**${message.author.username}**, you cannot reset your own warns.`)
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`**${message.author.username}**, ${message.mentions.users.first().username} does not have any warnings yet.`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)

    const embed = new MessageEmbed()
    .setTitle(`warnings reset | *${message.guild.name}*`)
    .setColor('#43b581')
    .setFooter(`moderator: ${message.author.tag}`)
    .setTimestamp(Date.now());
    user.send(embed)

    const complete = new MessageEmbed()
        .setDescription(`:warning: **${user}'s warnings have been reset by ${message.author}. (${user.id})**`);
    await message.channel.send(complete)
    
    const chnl = message.guild.channels.cache.find(c => c.name === 'modlog');

    const log = new MessageEmbed()
  .setTitle(`warnings reset | ${user.user.tag}`)
  .setColor('#43b581')
  .addField('User ID', user.user.id, true)
  .addField('User Tag', user.user.tag, true)
  .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }))
  .setTimestamp(Date.now());
  chnl.send(log);
    
}
}