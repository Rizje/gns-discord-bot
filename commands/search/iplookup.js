const { MessageEmbed } = require('discord.js');
const iplookup = require('ipapi.co')

module.exports = {
    name : 'iplookup',
    description : 'Search ip and get info about it in return.',
    category: 'search',
    usage : '<ip>',
    run : async(client, msg, args) => {


    if(!args[0]) return msg.channel.send(`**${msg.author.username}**, you forgot an IP!`)

 
    iplookup.location(function(data) { 
        if(data.error || data.reserved) return msg.channel.send('**${msg.author.username}**, could not find info about that ip address.')
       
        
      let embed = new MessageEmbed()
      .setTitle(data.ip)
      .addField(`City`, data.city,true)
      .addField(`Region`, data.region,true)
      .addField(`Region Code`, data.region_code,true)
      .addField('Country', data.country_name,true)
      .addField(`Capital`, data.country_capital,true)
      .addField(`Europe`, data.in_eu === true ? "yes" : "no",true)
      .addField(`Postal Code`, data.postal,true)
      .addField(`Latitude`, data.latitude,true)
      .addField(`Longitude`, data.longitude,true)
      .addField(`Orginaziation`, data.org,true)
      
      msg.channel.send(embed)
    }, args[0])

    
  
}
}