const yt = require('yt-search')
const { MessageEmbed } = require('discord.js');
const { util } = require('discord.js-commando')

module.exports = {
    name : 'youtube',
    aliases : ['yt'],
    description : 'Search specified query on the youtube.',
    category: 'search',
    usage : '<query>',
    run : async(client, msg, args) => {


    if (!args[0]) return msg.channel.send(`**${msg.author.username}**, i need something to search.`)
    yt(args.join(" "), (err, data) => {

        if (data.videos.length === 0) return msg.channel.send(`**${msg.author.username}**, could not find that query.`)
        if(err) throw err;
        const paginated = util.paginate(data.videos, 1, 15)


    let embed = new MessageEmbed()
    .setDescription(paginated.items.map(v => `:play_pause: **[${v.title}](${v.url})** ${v.timestamp}`))
    msg.channel.send(embed)
    })
}
}