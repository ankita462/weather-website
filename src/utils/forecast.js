var request=require('request')
const forecast=(latitude,longitude,callback) => {
    const url ='https://api.darksky.net/forecast/0d9fe381fbf90565905e683cd25ce741/'+latitude+ ','+longitude
    request({url, json:true},(error,{body}) => {
    if(error) {
        callback('Unable to connect with weather service')
    } else if(body.error) {
        callback('unable to find location. Try another Search!',undefined) 
    } else {
        const farh=body.currently.temperature
        const cel=(farh-32)*5/9;
        const cel1=cel.toPrecision(4)
        const high=(body.daily.data[0].temperatureHigh-32)*5/9
        const low=(body.daily.data[0].temperatureLow-32)*5/9
        callback(undefined,body.daily.data[0].summary+' It is currently ' +cel1 +' celsius degrees out. There high today is ' + high.toPrecision(4)+ '. There low today is ' + low.toPrecision(4)+'. There is '+body.currently.precipProbability+'% chance of rain' )
    }
})
}
module.exports = forecast