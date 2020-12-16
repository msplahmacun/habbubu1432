const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');
const weather = require('weather-js')//
const fs = require('fs');
const db = require('quick.db');//
const http = require('http');
const express = require('express');//
require('./util/eventLoader.js')(client);
const path = require('path');//
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();//
app.get("/", (request, response) => {
  console.log(Date.now() + "Nemesıs");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};//

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });//
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   (chalk.bgBlue.green(e.replace(regToken 'that was redacted')));
// }); //

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\G


client.on('guildMemberAdd', async member => {
  await member.addRole(`762053441446740038`) //id yazan yere verilecek rol (unregistered)
  await member.setNickname(``) //yeni gelen kullanıcının adını değiştirme
let member2 = member.user 
let zaman = new Date().getTime() - member2.createdAt.getTime()
var user = member2 
var takizaman = [];
if(zaman < 604800000) {
takizaman = '<a:teh:729375080387182603> Tehlikeli'
} else {
takizaman = `Güvenli`}require("moment-duration-format");
 let zaman1 = new Date().getTime() - user.createdAt.getTime()
 const gecen = moment.duration(zaman1).format(` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]`) 
 let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
 let message = member.guild.channels.find(x => x.id === `787386849198866472`) //id yazan kısma kanal id'si [orn: register-chat]
  const taki = new Discord.RichEmbed()
 .setTitle(
     "MovieStarPlanet'e Hoşgeldin"
   )
   .setDescription(`**・** :loudspeaker:  **Sunucumuza Hoş geldin** :loudspeaker:   ${member} 
   
:bookmark_tabs: ・Seninle Beraber** ${message.guild.memberCount} **Kişiyiz**

:small_blue_diamond: ・** **Kaydının Yapılması İçin İsmini ve Msp Nickini Yaz**

:white_check_mark: ・**@❁⋆ 　 ✦ Kayıtcı **Rolündeki Yetkililer Seninle İlgilenecektir**

:white_check_mark: ・** **Sunucumuzun Sınırsız Davet Bağlantısı** https://discord.gg/moviestars


:warning: **・** **Hesap Açılalı** ${gecen} **Olmuş**
:warning:  **・** **Bu Kullanıcı** **|** **${takizaman}**
`)
.setColor('PURPLE')
message.send(taki)
 
         });