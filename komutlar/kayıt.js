const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.find(r => r.id === "755723980006227970"); //buraya kayıtlı rolünüzün id'sini koyun
  const misafir = message.guild.roles.find(r => r.id === "762053441446740038"); //buraya misafir rolünüzün id'sini koyun.
  const log = message.guild.channels.find(c => c.id === "787386849198866472"); //buraya kayıt log id koyun
  const tag = "? |";
  if(!message.member.roles.array().filter(r => r.id === "762209521165795359")[0]) { //buraya kayıt sorumlusu rolünün id'sini giriniz. SUNUCU AYARLARINDAN kopyalayın.
    return message.channel.send("Bu işlemi sadece Ayarlanmış Kayıt Sorumluları gerçekleştirebilir.");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      
    c.addRole(kayıtlı)
    c.removeRole(misafir)
    c.setNickname(`${tag} ${nick}`)
    const embed = new Discord.RichEmbed()
    .setAuthor("Kayıt Yapıldı")
    .addField(`Kaydı yapılan\n`, `${c.user.tag}`)
    .addField(`Kaydı yapan\n`, `${message.author.tag}`)
    .addField(`Yeni isim\n`, `${tag} ${nick} , ${yas}`)
    .setFooter("Hex Kayıt Sistemi")
    .setColor("#6278c5")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};
exports.help = {
  name: "e",
  description: "e",
  usage: "e"
};
