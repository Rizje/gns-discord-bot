const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "muteroleall",
    description: "This cmd adds the muted role to every channel (dw if ur not a mod).",
    category: 'mod',
    run: async (client, message, args) => {

    let muterole = message.guild.roles.cache.find(role => role.name === 'Muted');

    message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.createOverwrite(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS : false
    })
    
})

const embed = new MessageEmbed()
.setDescription(`:gear::mute: **the "Muted" role has been added and set to the correct perms for every channel.**`)

    message.channel.send(embed)

}}