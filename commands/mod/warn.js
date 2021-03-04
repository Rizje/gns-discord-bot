const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "mod",
  usage: "<@user> <reason>",
  description: "Warn the specified victim. (5 max)",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, you cannot execute this command.`)
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send(`**${message.author.username}**, please mention the person who you want to warn.`)
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send(`**${message.author.username}**, how did the bot break a rule!?`)
    }
    
    if(message.author.id === user.id) {
      return message.channel.send(`**${message.author.username}**, you cannot warn yourself.`)
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.send(`**${message.author.username}**, please provide a reason to warn this user.`)
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 5) {
      return message.channel.send(`**${message.author.username}**, ${message.mentions.users.first().username} has already reached his/her limit of 5 warnings, whats next boss?`)
    }

    
    
    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
    }
    

        const embed = new MessageEmbed()
    .setTitle(`warning | *${message.guild.name}*`)
    .setColor('#fffa77')
    .setDescription(`**reason:** ${reason}\n**warnings:** ${warnings + 1}`)
    .setFooter(`moderator: ${message.author.tag}`)
    .setTimestamp(Date.now());
      user.send(embed)

      const complete = new MessageEmbed()
        .setDescription(`:warning: **${user} has been warned by ${message.author} for "${reason}". Warnings: ${warnings + 1}/5 (${user.id})**`);
            await message.channel.send(complete)

    const chnl = message.guild.channels.cache.find(c => c.name === 'modlog');

    const log = new MessageEmbed()
  .setTitle(`warning | ${user.user.tag}`)
  .setColor('#fffa77')
  .addField('User ID', user.user.id, true)
  .addField('User Tag', user.user.tag, true)
  .addField('Reason:', reason)
  .addField('Warnings:', warnings + 1)
  .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }))
  .setTimestamp(Date.now());
  chnl.send(log);
  } 
}