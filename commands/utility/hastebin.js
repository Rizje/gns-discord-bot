const hastebin = require('hastebin')

module.exports = {
    name : 'hastebin',
    aliases : ['hb'],
    description : 'Creates a hastebin with the provided text.',
    category: 'utility',
    usage : '<text>',
    run : async(client, msg, args) => {


    if(!args.join(" ").length) return msg.channel.send(`**${msg.author.username}**, you forgot some text!`)
    hastebin.createPaste(args.join(" "), {
        raw: false,
        contentType: 'text/plain',
        server: "https://hastebin.com"
    })
    .then(url => msg.channel.send(url))
    .catch(e => console.log(e))
}
}