const { Telegraf } = require('telegraf');
const { getData } = require('./covid');
const dotenv = require('dotenv');
dotenv.config();



const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome bro!!!!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))



bot.command('covid19', async (ctx) => {
    const data = await getData();
    console.log(data);
    // ctx.reply('we are fetching covid details');
    ctx.reply(`
        Country- India
        Total Cases- ${data.active} 😵
        Confirmed Cases- ${data.confirmed} 😢 
        Deaths- ${data.deaths} 😭
        New Cases Today- ${data.deltaconfirmed} 😱
        New Recovered Cases Today - ${data.deltarecovered} 😍
        New Death Tolls Today - ${data.deltadeaths} 😭 

    `);
})
bot.launch()