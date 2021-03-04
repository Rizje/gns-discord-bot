const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'image',
    aliases : ['img'],
    category : 'search',
    description : 'Searches google images for the specified query.',
    usage : '<query>',
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send(`**${msg.author.username}**, please enter a search query.`)

        message.channel.send(`:gear: **searching for entered query...**`)
        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}