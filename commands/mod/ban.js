var Discord = require('discord.js');

module.exports = {
    name: "ban",
    category: "mod",
    description: "Ban the specified user from the guild.",
    usage: "<@user> <reason>",
 run: async(client, msg, args) => {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send(`**${msg.author.username}**, you cannot execute this command.`);

    var user = msg.mentions.users.first();
    if(!user) return msg.channel.send(`**${msg.author.username}**, please mention the person who you want to ban.`);

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.channel.send(`**${msg.author.username}**, that user is not in this server.`);
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(`**${msg.author.username}**, you cannot ban this user.`);

    var reason = args[1] ? args.slice(1).join(' ') : 'no reason';

    var channel = msg.guild.channels.cache.find(c => c.name === 'potato');

    var embed = new Discord.MessageEmbed()
    .setTitle(`banned | *${msg.guild.name}*`)
    .setColor('#dd5f53')
    .setDescription(`**reason:** ${reason}`)
    .setFooter(`moderator: ${msg.author.tag}`)
    .setTimestamp(Date.now());

    try {
        await user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    msg.guild.members.ban(user);

    let replies = ["https://i.imgur.com/O3DHIA5.gif", "https://i.imgur.com/6Sh8csf.gif", "https://thumbs.gfycat.com/PlayfulFittingCaribou-max-1mb.gif", "https://media3.giphy.com/media/Vh2c84FAPVyvvjZJNM/giphy.gif", "https://media1.tenor.com/images/4732faf454006e370fa9ec6e53dbf040/tenor.gif?itemid=14678194", "https://i.imgur.com/QwReiS0.gif", "https://media.giphy.com/media/LPHbzPcICc86EVte9C/giphy.gif", "https://media.giphy.com/media/qPD4yGsrc0pdm/giphy.gif", "https://media.giphy.com/media/C51woXfgJdug/giphy.gif", "https://media.giphy.com/media/hFIkt5s7MrzI4/giphy.gif"];
    let random = Math.floor(Math.random() *10 );
    
    const complete = new Discord.MessageEmbed()
        .setDescription(`:boom: **We wont be seeing ${user} anytime soon! (${user.id})**`)
    msg.channel.send(complete);

    var gif = new Discord.MessageEmbed()
.setImage(`${replies[random]}`);
msg.channel.send(gif)

var modlog = new Discord.MessageEmbed()
.setTitle(`banned | ${user.tag}`)
.setColor('#dd5f53')
.addField('User ID', user.id, true)
.addField('User Tag', user.tag, true)
.addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
.setFooter(`${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({ dynamic: true }))
.setTimestamp(Date.now());

channel = client.channels.cache.get('795068329265070080');
    channel.send(modlog);
}
}