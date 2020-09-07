const request = require('postman-request');
const keys = require('../../constants/keys');

const geocode = (loc, key, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(loc) + ".json?access_token=" + key;


    request({url:url, json:true}, (err, res)=> {
        if (err) {
           callback('low level error')
        } else if(res.body.features.length === 0){
            callback('No location found')
        } else {
            const data = {
                location: res.body.features[0].place_name,
                lat: res.body.features[0].center[1],
                lon: res.body.features[0].center[0],
                
            }

            callback(undefined, data)
        }
    })

}


module.exports = geocode;
