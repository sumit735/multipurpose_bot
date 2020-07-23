const superagent = require('superagent');


const getSearchData = async (search) => {
    try{
        const response = await superagent.get(`https://www.jiosaavn.com/api.php?_format=json&__call=autocomplete.get&query=${search}`)
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
        const response = await superagent.get(`https://www.jiosaavn.com/api.php?_format=json&__call=content.getAlbumDetails&albumid=${songId}`)
        .set('accept', 'json')
        .set('Content-Type', 'application/json');
        return JSON.parse(response.text.slice(response.text.indexOf('{')));
        
    } catch(e) {
        console.log('song fetching error '+e);
        ctx.reply('song fetching error');
    }
}

module.exports = {
    getSearchData,
    getSongData
}