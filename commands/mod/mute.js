var Discord = require('discord.js');
var ms = require('ms');

module.exports = {
    name: "mute",
    category: "mod",
    description: "Mute the specified user in the guild.",
    usage: "<@user> <time> <reason>",
 run: async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(`**${msg.author.username}**, you cannot execute this command.`);

    var user = msg.mentions.users.first();
    if(!user) return msg.channel.send(`**${msg.author.username}**, please mention the person who you want to mute.`);

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.channel.send(`**${msg.author.username}**, that user is not in this server.`);
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(`**${msg.author.username}**, you cannot kick this user.`);

    var rawTime = args[1] ? args.slice(1).join(' ') : '5m';
    var time = ms(rawTime);

    var reason = args[2] ? args.slice(2).join(' ') : 'no reason';

    var channel = msg.guild.channels.cache.find(c => c.name === 'modlog');

    var log = new Discord.MessageEmbed()
    .setTitle(`muted | ${user.tag}`)
    .setColor('#dd5f53')
    .addField('User ID', user.id, true)
    .addField('User Tag', user.tag, true)
    .addField('Muted Reason', reason != null ? reason : 'no reason')
    .addField('Expires:', rawTime)
    .setFooter(`${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp(Date.now());
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle(`muted | *${msg.guild.name}*`)
    .setColor('#dd5f53')
    .setDescription(`**reason:** ${reason}`)
    .addField('expires:', rawTime)
    .setFooter(`moderator: ${msg.author.tag}`)
    .setTimestamp(Date.now());

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    var role = msg.guild.roles.cache.find(r => r.name === 'Muted');

    member.roles.add(role);

    setTimeout(async() => {
        member.roles.remove(role);
    }, time);

    const complete = new Discord.MessageEmbed()
        .setDescription(`:mute: **${user} has been silenced! Expires: ${rawTime} (${user.id})**`)
    msg.channel.send(complete);
}
}