const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "flip",
    description: "Flips a coin.",
    category: "fun",
    run: async (client, message, args) => {

        var choices = [
            "heads",
            "tails"
        ]

        var output = choices[Math.floor(Math.random()*choices.length)];

        var embed = new MessageEmbed()
        .setDescription(`:coin: coin landed on **${output}**!`)
        message.channel.send(embed)
    }}