const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name : 'wink',
    description : 'Wink at someone.',
    category: 'fun',
    usage: '<@user>',
    run : async(client, message, args) => {

        const url = 'https://some-random-api.ml/animu/wink';

        if(!message.mentions.users.first()) return message.channel.send(`**${message.author.username}**, who are you winking at?`)

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`**${message.author.username}**, an error occured!`)
        }

        const embed = new MessageEmbed()
            .setTitle(`@${message.author.username} winks at @${message.mentions.users.first().username || message.mentions.members.first()}`)
            .setImage(data.link)

        await message.channel.send(embed)
    }
}