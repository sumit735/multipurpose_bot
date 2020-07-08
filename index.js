const { Composer } = require('micro-bot')
const { getData } = require('./covid');
const dotenv = require('dotenv');
dotenv.config();



const bot = new Composer;
bot.start((ctx) => ctx.reply('Welcome bro!!!!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('banda', (ctx) => ctx.reply('Tu gandimara bedhua randi tate mendhi gehiba bhak mg'))



bot.command('covid19', async (ctx) => {
    const data = await getData();
    console.log(data);
    // ctx.reply('we are fetching covid details');
    ctx.reply(
        `Country- IndiaTotal Cases- ${data.active} 😵`/n `Confirmed Cases- ${data.confirmed} 😢` /n `Deaths- ${data.deaths} 😭 `/n `New Cases Today- ${data.deltaconfirmed} 😱` /n `New Recovered Cases Today - ${data.deltarecovered} 😍` /n `New Death Tolls Today - ${data.deltadeaths} 😭 `);
})

// https://sumit735-bot.herokuapp.com/


module.exports = bot