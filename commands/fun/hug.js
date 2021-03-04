const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name : 'hug',
    description : 'Hugs the specified user.',
    category: 'fun',
    usage: '<@user>',
    run: async (client, message, args) => {

        const url = 'https://some-random-api.ml/animu/hug';

        if(!message.mentions.users.first()) return message.channel.send(`**${message.author.username}**, who are you hugging?`)

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`**${message.author.username}**, an error occured, please try again!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`@${message.author.username} hugs @${message.mentions.users.first().username || message.mentions.members.first()}`)
            .setImage(data.link)

        await message.channel.send(embed)
    }
}