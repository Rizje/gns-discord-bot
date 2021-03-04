const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "totalbans",
  aliases : ['tbans'],
  description: "Returns all of the banned users.",
  run: async (client, message, args) => {

        message.guild.fetchBans().then(bans => {

            const embed = new MessageEmbed()
            .setDescription(`:bangbang: there are **${bans.size}** total bans!`)

            message.channel.send(embed)
        })

    }
}