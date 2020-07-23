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
    let searchData = ctx.update.message.text.replace('/song', '');
    if(searchData == '' || searchData == undefined || searchData == null) {
        return ctx.reply('send the command with a song/album name');
    }

    let response = await getSearchData(searchData);
    console.log(response.songs.data[0]);
    const searchDetails = response.songs.data[0];
    let songId = searchDetails.id;
    let getSongdetails = await getSongData(songId);
    
    console.log(getSongdetails);
    console.log(getSongdetails[`${songId}`]);

    let songDetails = getSongdetails[`${songId}`];

    let song = songDetails.media_preview_url;
    console.log(song);
    image = songDetails.image;
    image = image.replace("150x150", "250x250");
    song = song.replace("preview", "aac");
    song = song.replace("96_p.mp4", "320.mp4");

    
    console.log(song);
    ctx.replyWithPhoto(image);
    ctx.reply(songDetails.song);
    ctx.replyWithAudio(song, {
        caption: songDetails.song
    });
});


// https://sumit735-bot.herokuapp.com/


module.exports = bot