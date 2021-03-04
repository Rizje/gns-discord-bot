const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'mod',
    description: 'Unban the specified user from the guild.',
    usage: '<userID> <reason>',
    run: async(client, message, args) => {

        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`**${message.author.username}**, you cannot execute this command.`);

        if (!args[0]) return message.channel.send(`**${message.author.username}**, please enter the user's id.`);

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send(`**${message.author.username}**, that user could not be found.`);
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            if (user) {
                embed.setTitle(`unbanned | ${user.user.tag}`)
                    .setColor('#43b581')
                    .addField('User ID', user.user.id, true)
                    .addField('User Tag', user.user.tag, true)
                    .addField('Banned Reason', user.reason != null ? user.reason : 'no reason')
                    .addField('Unbanned Reason', reason)
                    .setTimestamp(Date.now());
                message.guild.members.unban(user.user.id, reason)

                const complete = new MessageEmbed()
                .setDescription(`:white_check_mark: **Successfully unbanned ${user.user}! (${user.user.id})**`)
            message.channel.send(complete);
            chnll = client.channels.cache.get('795068329265070080');
                chnll.send(embed)
            } else {
                message.channel.send(`**${message.author.username}**, user ${member.tag} isn't banned!`)
            }

        }).catch(e => {
            console.log(e)
            message.channel.send(`**${msg.author.username}**, an error has occured.`)
        });

    }
}