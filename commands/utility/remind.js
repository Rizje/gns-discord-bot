const Discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")

module.exports = {
    name : 'remind',
    aliases : ['r'],
    description : 'Dms you with a reminder that you set.',
    category: 'utility',
    usage : '<amount of time> <reminder>',
    run : async(client, message, args) => {

let timeuser = args[0]
let reason = args.slice(1).join(" ")


if(!timeuser) return message.channel.send(`**${message.author.username}**, please enter an amount of time.`)
if(!reason) return message.channel.send(`**${message.author.username}**, please provide the thing im reminding you of`)

db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))
message.channel.send(`**${message.author}**, i will dm you when it is time!`)
const interval = setInterval(function() {


    if(Date.now() > db.fetch(`remind.${message.author.id}`)){
        db.delete(`remind.${message.author.id}`)
        message.author.send(`**Reminder:** ${reason}`)
        .catch(e => console.log(e))
        clearInterval(interval)
    }

},1000)
}
}