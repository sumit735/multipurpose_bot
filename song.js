const superagent = require('superagent');

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


module.exports = {
    getSearchData,
    getSongData
}