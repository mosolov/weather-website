const request = require('postman-request');


const forecast = (data, key, callback) =>  {
    const url = 'http://api.weatherstack.com/current?access_key=' + key + '&query='+data.lat+','+data.lon;
    const loc = data.location;
    request({url:url, json:true}, (err, res)=> {
          if(err){
              callback('weather low level err')
          } else if (res.body.error){
            callback('weather high level err', err)
          }else {
              data={
                 temp: res.body.current.temperature,
                 rain: res.body.current.precip,
                 loc: loc
              }
    
              callback(undefined, data)
          }
      })
}

module.exports = forecast;