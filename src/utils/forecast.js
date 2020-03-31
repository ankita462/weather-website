var request=require('request')
const forecast=(latitude,longitude,callback) => {
    const url ='https://api.darksky.net/forecast/0d9fe381fbf90565905e683cd25ce741/'+latitude+ ','+longitude
    request({url, json:true},(error,{body}) => {
    if(error) {
        callback('Unable to connect with weather service')
    } else if(body.error) {
        callback('unable to find location. Try another Search!',undefined) 
    } else {
        callback(undefined,body.daily.data[0].summary+' It is currently ' +body.currently.temperature + ' degrees out. There is '+body.currently.precipProbability+'% chance of rain' )
    }
})
}
module.exports = forecast