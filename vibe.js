const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch')
const usersMap = new Map();
const LIMIT = 5;
const TIME = 15000;
const DIFF = 3000;
const db = require("quick.db")
const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION"]
})
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
});

client.on('message', async message =>{
    if(message.author.bot) return;

    //checking for message while afk
    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)

        const afkremove = new MessageEmbed()
        .setDescription(`:zzz: **your afk status has been removed ("${info}")**`)

        message.channel.send(`${message.author}`, afkremove)
    }else;

    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
});

client.on('message', async message =>{
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {

            const afkreason = db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)

            const afkrespond = new MessageEmbed()
            .setDescription(`:zzz: **${message.mentions.members.first().user.tag}** is in *AFK Mode*.\n\n**Reason:** "${afkreason}"`)

            message.channel.send(`${message.author}`, afkrespond)
        }
        }});


client.on('message', async message =>{
    if(message.author.bot) return;
if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    console.log(difference);

    if(difference > DIFF) {
        clearTimeout(timer);
        console.log('Cleared Timeout');
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, userData)
    }
    else {
        ++msgCount;
        if(parseInt(msgCount) === LIMIT) {
            let muterole = message.guild.roles.cache.find(role => role.name === 'Muted');
            if(!muterole) {
                try{
                    muterole = await message.guild.roles.create({
                        name : "Muted",
                        permissions: []
                    })
                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS : false
                        })
                    })
                }catch (e) {
                    console.log(e)
                }
            }
            message.member.roles.add(muterole);
            message.channel.send(`**${message.author}**, **you have been muted for spam!**`);
            setTimeout(() => {
                message.member.roles.remove(muterole);
                message.channel.send(`**${message.author}**, **you have been unmuted!**`)
            }, TIME);
        } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
        }
    }
}
else {
    let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from map.')
    }, TIME);
    usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage : message,
        timer : fn
    })
}
})

client.snipe = new Map()
client.on("messageDelete", async(message,channel) => {
    if(message.author.bot) return;
    if(!message.guild) return;
    client.snipe.set(message.channel.id, {
        msg:message.content,
        user:message.author.tag,
        profilephoto:message.author.displayAvatarURL(),
        image:message.attachments.first() ? message.attachments.first().proxyURL : null,
        date:message.createdTimestamp
        
    })
})

client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "entrance")
    if (!channel) return;

    const joinembed = new MessageEmbed()
    .setDescription(`:wave: **Welcome ${member}!**`)
    .setColor('RANDOM')

    channel.send(joinembed)

    if(db.has(`captcha-${member.guild.id}`)=== false) return;
    const url = 'https://api.no-api-key.com/api/v2/captcha';
        try {
            fetch(url)
                .then(res => res.json())
                .then(async json => {
                    console.log(json)
                    const message = await member.send(
                        new MessageEmbed()
                            .setTitle('Please enter the captcha ( 60s to answer | 1 attempt )')
                            .setImage(json.captcha)
                            .setColor("RANDOM")
                    )
                    try {
                        const filter = (m) => {
                            if(m.author.bot) return;
                            if(m.author.id === member.id && m.content === json.captcha_text) return true;
                            else {
                                message.channel.send("You have answered the captcha incorrectly!")
                            }
                        };
                        const response = await message.channel.awaitMessages(filter, {
                            max : 1,
                            time : 60000,
                            errors : ['time']
                        })
                        if(response) {
                            message.channel.send('Congrats, you have answered the captcha.')
                        }
                    } catch (error) {
                        message.channel.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly.`)
                        member.kick()
                    }
                })
        } catch (error) {
            console.log(error)
        }
});

client.on('guildMemberRemove', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "exit")
    if (!channel) return;

    const joinembed = new MessageEmbed()
    .setDescription(`:door: **Goodbye ${member}!**`)
    .setColor('RANDOM')

    channel.send(joinembed)
});

client.login(token)