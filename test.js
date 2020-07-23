const superagent = require('superagent');
const { Telegraf } = require('telegraf');

const bot = new Telegraf('1171759737:AAHfXxCe7wpcVu1J_9Bg9yhz7Epl-pa02j8');

const getSearchData = async (search) => {
    try{
        const response = await superagent.get(`https://www.saavn.com/api.php?__call=autocomplete.get&_marker=0&query=${search}&ctx=android&_format=json&_marker=0`)
        .set('accept', 'json')
        .set('Content-Type', 'application/json');
        
        return JSON.parse(response.text.slice(response.text.indexOf('{')));
    } catch(e) {
        console.log('searchData error '+e);
        ctx.reply('search error');
    }
    
}

const getSongData = async (songId) => {
    try {
        const response = await superagent.get(`https://www.jiosaavn.com/api.php?cc=in&_marker=0%3F_marker%3D0&_format=json&model=Redmi_5A&__call=song.getDetails&pids=${songId}`)
        .set('accept', 'json')
        .set('Content-Type', 'application/json');
        return JSON.parse(response.text.slice(response.text.indexOf('{')));
        
    } catch(e) {
        console.log('song fetching error '+e);
    }
}


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
})



bot.launch()