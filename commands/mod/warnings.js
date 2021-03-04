const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warnings",
  aliases: ["warns"],
  description: "Get the warnings of the specified user.",
  category: "mod",
  usage: "<@user>",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    const complete = new MessageEmbed()
        .setDescription(`:warning: **${user} has *${warnings}* warning(s). (${user.id})**`);
    
    message.channel.send(complete)
  
  
  }
}