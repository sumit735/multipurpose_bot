// async code
const superagent = require('superagent');

const getData = async () => {
    try{
        const response = await superagent.get('https://api.covid19india.org/data.json');
        return response.body.statewise[0];
    } catch(e) {
        console.log('covid.js error '+e);
    }
    
}

// code handling promises
// const axios = require('axios');
 

// const getData = () => {
//     // return 'hello';
//     return axios.get('https://api.covid19india.org/data.json')
//         .then(function (response) {
//             // handle success
//             // console.log(response.data.statewise[0]);
//             return response.data.statewise[0];
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//             return 'Sorry! Something went wrong'
//         });
// }



module.exports = {
    getData
};
