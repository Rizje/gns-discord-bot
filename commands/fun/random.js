const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'random',
    aliases: ['rand'],
    description: "Generates a random number.",
    usage: '<min> <max>',
    run: async (client, message, args, Discord) => {
  
      if (!args.length || !args[1]) {
        message.channel.send(`**${message.author.username}**, you need to type in the min and max values.`)
      }
  
      else {
  
        let max = args[1]
        let min = args[0]
  
      let randNo = Math.round(Math.random() * max + min)
  
      const embed = new MessageEmbed()
      .setTitle("Your random number is: ")
      .setDescription(randNo)
      .setFooter("Random Number Generator")
      .setTimestamp()
  
      message.reply(embed)
  
      }
  
    }
  }