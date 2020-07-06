const { getData } = require('./covid');

const data =  getData().then(function(d) {
    console.log(d);
});

// console.log(getData());
// console.log(object);