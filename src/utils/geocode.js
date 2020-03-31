var request=require('request')
const geocode=(address,callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYW5raXRhNDYyIiwiYSI6ImNrOGJ0MDVibzBmNHkzanF0M3Y4NnN1OHEifQ.CUBBQh8lzariIBbVBqkSrw'
    request({url, json:true},(error,{body}) => {
    if(error) {
        callback('Unable to connect with weather service',undefined)
    } else if(body.features.length===0) {
        callback('unable to find location. Try another Search!',undefined) 
    } else {
        var locObj=new Object()
        locObj.latitude= body.features[0].center[1],
        locObj.longitude=body.features[0].center[0],
        locObj.location= body.features[0].place_name
        callback(undefined, locObj)
    }
})
}
module.exports = geocode