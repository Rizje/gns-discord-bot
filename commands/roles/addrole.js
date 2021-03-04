const { Message } = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'addrole',
    aliases : ['addr'],
    category: 'roles',
    description : 'Add a role to specified user.',
    usage : '<@user> <@role>',
    run : async(client, message, args) => {

        const user = message.mentions.users.first();

        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}**, you cannot execute this command.`)
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send(`**${message.author.username}**, please mention the person who you want to grant a role.`) //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send(`**${message.author.username}**, please mention the role you want to grant.`) //when no role is specified or pinged
        //now the code!
        await target.roles.add(role) // adding the role to the user

        const channel = message.guild.channels.cache.find(c => c.name === 'modlog');

        const log = new MessageEmbed()
        .setTitle(`role added | ${user.tag}`)
        .setColor('#43b581')
        .addField('User ID', user.id, true)
        .addField('User Tag', user.tag, true)
        .addField('Role', message.mentions.roles.first())
        .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp(Date.now());
        channel.send(log);

        const embed = new MessageEmbed()
    .setTitle(`role added | *${message.guild.name}*`)
    .setColor('#43b581')
    .setDescription(`**role:** ${role.name}`)
    .setFooter(`moderator: ${message.author.tag}`)
    .setTimestamp(Date.now());

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

        const complete = new MessageEmbed()
        .setDescription(`:pray: **${user} has obtained a new role! (${user.id})**`)
        message.channel.send(complete)
    }
}