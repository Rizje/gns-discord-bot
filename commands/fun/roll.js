const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "roll",
  description: "Rolls a dice.",
  category: "fun",
  run: async (client, message, args) => {

    const randomRoll = Math.floor(Math.random() * 6) + 1;
    const roll = new MessageEmbed();
    roll.setTitle("Roll!");
    roll.setDescription(`The dice rolled **${randomRoll}**`);
    roll.setColor("C83838");
    roll.setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(roll);

  },
};