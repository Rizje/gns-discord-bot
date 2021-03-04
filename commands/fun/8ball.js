const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name : '8ball',
    description : 'Shake the 8ball.',
    category: 'fun',
    usage: '<question>',
    run : async(client, message, args) => {


    if(!args[0]) return message.channel.send(`**${message.author.username}**, you must enter an ask.`)
    if(args[0].length < 1) return message.channel.send(`**${message.author.username}**, you must enter an ask.`)


    let i = ["Yes","No","Maybe","Maybe not"]

    let y = i[Math.floor(i.length * Math.random())]

    const embed = new MessageEmbed()
    .setDescription(`:8ball: ${y}`)

    message.channel.send(embed)
}
}