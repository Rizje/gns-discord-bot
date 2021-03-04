const math = require('discord-math');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "solve",
    description: "This cmd will do math for you since you're retarded.",
    category: 'utility',
    usage: '<#1> <operation> <#2>',
    run: async (client, message, args) => {
        try {
            let num1 = Number(args[0]);
            let operation = args[1];
            let num2 = Number(args[2]);

            if (!num1) return message.channel.send(`**${message.author.username}**, #1 needs to be specified!`);
            if (!operation) return message.channel.send(`**${message.author.username}**, an operation was not specified!`);
            if (!num2) return message.channel.send(`**${message.author.username}**, #2 needs to be specified!`);

            const embed = new MessageEmbed()
            .setDescription(`:1234: **answer:** "${math.calculate(num1, operation, num2)}"`)
 
            message.channel.send(embed);
        } catch (e) {
            console.log(e);
        }
    }
}