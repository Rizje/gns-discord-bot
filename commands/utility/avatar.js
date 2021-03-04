const Discord = require("discord.js")

module.exports = {
    name : 'avatar',
    aliases : ['av'],
    description : 'Returns the avatar of the user specified.',
    category: 'utility',
    usage : '<@user>',
    run : async(client, message, args) => {

        let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }

   if(!user.avatarURL()) return message.reply(`**${message.author.username}**, avatar not found.`)
   let embed = new Discord.MessageEmbed()
   .setDescription(`[PNG](${user.avatarURL({format: "png"})}) **|** [JPG](${user.avatarURL({format: "jpg"})}) **|** [WEBP](${user.avatarURL({format: "webp"})}) **|** [GIF](${user.avatarURL({format: "gif"})})`)
   .setImage(user.avatarURL({dynamic: true})+"?size=2048") //Size :D
   .setTimestamp()
   .setAuthor(user.tag,user.avatarURL())

   message.channel.send(embed)
}
}