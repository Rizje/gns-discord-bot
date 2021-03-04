const isReachable = require('is-reachable');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'checkhost',
    aliases : ['ch'],
    description : 'Checks if the website is online or offline and returns the answer in an embed.',
    category: 'search',
    usage : '<url>',
    run : async(client, msg, args) => {

    if(!args[0]) return msg.channel.send(`**${msg.author.username}**, you forgot a website to check!`)
    let reachable = await isReachable(args[0])

    if(reachable) {
        return msg.channel.send(new MessageEmbed().setDescription(`:globe_with_meridians: **${args[0]} is online.**`))
    } 
    return msg.channel.send(new MessageEmbed().setDescription(`:globe_with_meridians: **${args[0]} is offline.**`))
}
}