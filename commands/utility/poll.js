const Discord = require('discord.js');

module.exports = {
    name : 'poll',
    description : 'Creates a poll.',
    category: 'utility',
    usage : '<#channel> <desc>',
    run : async(client, message, args) => {
        
let pollChannel = message.mentions.channels.first();
if(!pollChannel) message.channel.send(`**${message.author.username}**, please mention the channel to send the poll to.`)
        
        let pollDescription = args.slice(1).join(' ');

        let embedPoll = new Discord.MessageEmbed()
        .setTitle('New Poll.')
        .setDescription(pollDescription)
        .setColor('YELLOW')
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }
}