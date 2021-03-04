const { MessageAttachment } = require('discord.js')
const tfa = require('text-fonts-api')

module.exports = {
    name : 'fnfont',
    description : 'Converts the provided text into Fortnite Font.',
    category: 'fun',
    usage: '<text>',
    run : async(client, msg, args) => {

    let text = args.join(" ")
	let img = new tfa.fortniteFont(text)
	let attachment = new MessageAttachment(img.url, 'fortnite.png')

    msg.channel.send(attachment)
    
}};