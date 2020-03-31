const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath) 
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
    res.render('index',{
        title:'Weather',
        name:'Ankita Garg'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'About Me',
        name:'Ankita Garg'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title:'Help',
        name:'Ankita Garg'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error:'Please provide address'
        })
    }
    const inputLocation=req.query.address
    geocode(inputLocation,(error,{latitude,longitude,location}={})=> {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Ankita',
        errorMessage:'Help article not Found!!!'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Ankita',
        errorMessage:'Page not Found!!!'
    })
})

app.listen(3000,()=> {
    console.log('Server is up on port 3000')
})