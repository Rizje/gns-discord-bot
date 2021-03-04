const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "unmute",
    category: "mod",
    usage: "<@user>",
    description: "Unmute the specified user.",
    run: async (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(
            `**${message.author.username}**, you cannot execute this command.`
        );
      }
  
      if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(`**${message.author.username}**, i do not have permission to execute this command.`);
      }
  
      const user = message.mentions.members.first();
  
      if (!user) {
        return message.channel.send(
            `**${message.author.username}**, please mention the person who you want to unmute.`
        );
      }
      
      let muterole = message.guild.roles.cache.find(x => x.name === "Muted") 
      
      user.roles.remove(muterole)
      
      const complete = new MessageEmbed()
      .setDescription(`:mute: **${user} has found their voice! (${user.id})**`)
      await message.channel.send(complete);
      
      const embed = new MessageEmbed()
    .setTitle(`unmuted | *${message.guild.name}*`)
    .setColor('#43b581')
    .setFooter(`moderator: ${message.author.tag}`)
    .setTimestamp(Date.now());
      await user.send(embed)

      const chnl = message.guild.channels.cache.find(c => c.name === 'modlog');

      const log = new MessageEmbed()
    .setTitle(`unmuted | ${user.user.tag}`)
    .setColor('#43b581')
    .addField('User ID', user.user.id, true)
    .addField('User Tag', user.user.tag, true)
    .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp(Date.now());
    chnl.send(log);
  
    }
  };