const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'gn',
    category: 'info',
    description: "Returns gn's socials.",
    run : async(client, message, args) => {
        const embed = new MessageEmbed()
        .addFields(
            {name: 'Discord:', value: '<@391756169217310720>'},
            {name: 'Insta:', value: '[@gnfq](https://instagram.com/gnfq)'},
            {name: 'TikTok:', value: '[@.gnfq](https://tiktok.com/@.gnfq)'},
            {name: 'Jeti:', value: '[@gvn](https://link.jeti.app/user/gvn)'}
        )
        message.channel.send(embed)
    }
}