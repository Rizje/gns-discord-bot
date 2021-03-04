const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'afk',
    description : 'Returns a message saying that you are doing something if you get pinged.',
    category: 'utility',
    usage : '<what-ur-doing>',
    run : async(client, message, args) => {

        const content = args.join(" ")
        await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
        const embed = new MessageEmbed()
        .setDescription(`:zzz: **you have been set to *AFK Mode*.**\n\n**reason :** "${content}"`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
        message.channel.send(embed)                
    }
}