const Discord = require("discord.js")

module.exports = {
    name : 'snipe',
    description : 'Sends the last deleted message.',
    category: 'fun',
    run : async(client, message, args) => {

    let snip = client.snipe.get(message.channel.id)

    if(!snip) return message.channel.send(`**${message.author.username}**, nothing found.`)

    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(snip.user,snip.profilephoto)
    .setDescription(`**Message:**\`${snip.msg}\``)
    .setTimestamp(snip.date)
    if(snip.image) embed.setImage(snip.image)

    message.channel.send(embed)
}
}