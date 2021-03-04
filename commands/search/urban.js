const { MessageEmbed } = require('discord.js');
const urban = require('relevant-urban')

module.exports = {
    name : 'urban',
    description : 'Search specified word on the urban dictionary.',
    category: 'search',
    usage : '<word>',
    run : async(client, msg, args) => {

    try {
    const search = await urban(args.join(" "))

    let embed = new MessageEmbed()
    .setDescription(`:book: **${search.word}**\nDefinition: **${search.definition}**\n\nExample: **${search.example}**`)
    msg.channel.send(embed)
} catch(err) {
    return msg.channel.send(`**${msg.author.username}**, could not find that query.`)
} 
}
}
