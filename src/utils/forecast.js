const request = require('request');

const forecast = (latitude, longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=65352d0b0fb7c8c3ad045888c5934bd0&query='+ latitude + ',' + longitude + '&units=m';
    
    request({url,json:true},(error,{body}={})=>{
        if(error) {
            callback('Unable to connect, Check Your Inter Connection', undefined);

        }else if (body.error) {
            callback('Location not found, Enter a Valid Location', undefined);

        }else {
            callback(undefined,'Current tempreture is '+ body.current.temperature+ ' Degrees!! and Feels like '+ body.current.feelslike+' Degrees!!');

        }
    })
}

module.exports = forecast;