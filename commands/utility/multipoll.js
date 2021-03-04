const Discord = require('discord.js');

module.exports = {
    name : 'multipoll',
    aliases : ['mpoll'],
    description : 'Creates a poll with multiple choice answers.',
    category: 'utility',
    usage : '<#channel> <question-with-no-spaces> <"option#1"> <"option#2"> etc.',
    run : async(client, message, args) => {

        let pollChannel = message.mentions.channels.first();
        let pollQuestion = args[1]

        const polls = args.slice(2).join(' ')

        const regex = polls.match(/"[^"]+"|[\\S]+"[^"]+/g)

        if(regex.length >= 9) {
            return message.channel.send(`**${message.author.username}**, you can only have 9 poll options.`)
        }

        let str = ''

        let emojis = [
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣'
        ]

        let i = 0

        for(const poll of regex) {
            str = str + `${emojis[i]} ${poll}\n\n`
            i++
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(pollQuestion)
        .setDescription(str.replace(/"/g, ''))

        const msg = await pollChannel.send(embed)

        for(let i = 0; i < regex.length; i++) {
            msg.react(emojis[i])
        }
    }
}