const { Composer } = require('micro-bot')
const { getData } = require('./covid');
const { getSearchData, getSongData } = require('./song');
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
    ctx.replyWithHTML(
        `Country- IndiaTotal Cases- ${data.active} 😵
         Confirmed Cases- ${data.confirmed} 😢
         Deaths- ${data.deaths} 😭
         New Cases Today- ${data.deltaconfirmed} 😱
         New Recovered Cases Today - ${data.deltarecovered} 😍
         New Death Tolls Today - ${data.deltadeaths} 😭 `
    );
})

bot.command('song', async (ctx) => {
    let searchData = ctx.update.message.text.split(' ');
    console.log(searchData[1]);
    if(searchData[1] == '' || searchData[1] == undefined || searchData[1] == null) {
        return ctx.reply('send the command with a song/album name');
    }

    let response = await getSearchData(searchData[1]);
    console.log(response.albums.data);
    console.log(response.albums.data[0].id);

    let songDetails = await getSongData(response.albums.data[0].id);

    console.log(songDetails);

    let song = songDetails.songs[0].media_preview_url;
    console.log(song);
    image = songDetails.songs[0].image;
    image = image.replace("150x150", "350x350");
    song = song.replace("preview", "aac");
    song = song.replace("96_p.mp4", "320.mp4");
    
    console.log(song);
    ctx.replyWithPhoto(image);
    ctx.reply(songDetails.songs[0].song);
    ctx.replyWithAudio(song);
})


// https://sumit735-bot.herokuapp.com/


module.exports = bot