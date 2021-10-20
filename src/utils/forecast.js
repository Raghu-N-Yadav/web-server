const request = require('request');

const forecast = (latitude, longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=65352d0b0fb7c8c3ad045888c5934bd0&query='+ latitude + ',' + longitude + '&units=f';
    
    request({url,json:true},(error,{body}={})=>{
        if(error) {
            callback('Unable to connect', undefined);

        }else if (body.error) {
            callback('Location not found', undefined);

        }else {
            callback(undefined,' current tempreture is '+ body.current.temperature+ ' and feels like '+ body.current.feelslike);
        }
    })
}

module.exports = forecast;