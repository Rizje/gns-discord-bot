var Discord = require('discord.js');

module.exports = {
    name: "kick",
    category: "mod",
    description: "Kick the specified user from the guild.",
    usage: "<@user> <reason>",
 run: async(client, msg, args) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send(`**${msg.author.username}**, you cannot execute this command.`);

    var user = msg.mentions.users.first();
    if(!user) return msg.channel.send(`**${msg.author.username}**, please mention the person who you want to kick.`);

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.channel.send(`**${msg.author.username}**, that user is not in this server.`);
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(`**${msg.author.username}**, you cannot kick this user.`);

    var reason = args[1] ? args.slice(1).join(' ') : 'no reason';

    var embed = new Discord.MessageEmbed()
    .setTitle(`kicked | *${msg.guild.name}*`)
    .setColor('#dd5f53')
    .setDescription(`**reason:** ${reason}`)
    .setFooter(`moderator: ${msg.author.tag}`)
    .setTimestamp(Date.now());

    try {
        await user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    member.kick(reason);

    const complete = new Discord.MessageEmbed()
        .setDescription(`:boot: **Sent ${user} to Brazil! (${user.id})**`)
    msg.channel.send(complete);

    var modlog = new Discord.MessageEmbed()
.setTitle(`kicked | ${user.tag}`)
.setColor('#dd5f53')
.addField('User ID', user.id, true)
.addField('User Tag', user.tag, true)
.addField('Kicked Reason', reason != null ? reason : 'no reason')
.setFooter(`${msg.author.tag} | ${msg.author.id}`, msg.author.displayAvatarURL({ dynamic: true }))
.setTimestamp(Date.now());

channel = client.channels.cache.get('795068329265070080');
    channel.send(modlog);
}
}