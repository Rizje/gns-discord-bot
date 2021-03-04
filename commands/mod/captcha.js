const db = require('quick.db')
const { MessageEmbed } = require("discord.js")

module.exports = {
    name : 'captcha',
    category : 'mod',
    description : 'Enable/disable captcha feature. (NOT RECOMMENDED TO DISABLE)',
    usage : '<on/off>',

    run : async(client, message, args) => {
        if(args[0] === 'on') {

            await db.set(`captcha-${message.guild.id}`, true)

            const captchaon = new MessageEmbed()
            .setDescription(`:abc: **captcha module is enabled.**`)
            message.channel.send(captchaon)

        } else if(args[0] === 'off') {
            await db.delete(`captcha-${message.guild.id}`)

            const captchaoff = new MessageEmbed()
            .setDescription(`:abc: **captcha module is disabled.**`)
            message.channel.send(captchaoff)
        }
    }
}