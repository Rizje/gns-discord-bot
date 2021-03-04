const { MessageEmbed, DiscordAPIError } = require('discord.js')
module.exports = {
    name: "purge",
    category: "mod",
    description: "Clear the specified amount of messages.",
    usage: "<# of messages>",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) // sets the permission
            return message.channel.send(
                `**${message.author.username}**, you cannot execute this command.` // returns this message to user with no perms
            );
        if (!args[0]) {
            return message.channel.send(`**${message.author.username}**, please enter the amount of messages to clear. (1-100)`)
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
        .setDescription(`:wastebasket: **Successfully purged ${deleteAmount} messages.**`)

        await message.channel.send(embed)
        .then(msg => {
            msg.delete({ timeout: 5000 })
          })
          .catch(console.error);
    }
}