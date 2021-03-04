const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'mucckkel',
    aliases: ['mu'],
    category: 'info',
    description: "Returns mucckkel's socials.",
    run : async(client, message, args) => {
        const embed = new MessageEmbed()
        .addFields(
            {name: 'Discord:', value: '<@538212793829294090>'},
            {name: 'Xbox:', value: '[@Mucckkel](https://account.xbox.com/en-us/profile?gamertag=Mucckkel)'},
            {name: 'Spotify:', value: '[@Mucckkel :)](https://open.spotify.com/user/i31ab13hlyqrm1r8o373b223i)'},
            {name: 'TikTok:', value: '[@mucckkel](https://www.tiktok.com/@mucckkel)'},
            {name: 'Jeti:', value: '[@mkx](https://link.jeti.app/user/mkx)'}
        )
        message.channel.send(embed)
    }
}