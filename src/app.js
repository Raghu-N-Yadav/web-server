const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');
const { query } = require('express');
const { response } = require('express');

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const app = express();

//define path for express config
const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templet/views');
const partialsPath = path.join(__dirname, '../templet/partials');

//setup static directory to serve
app.use(express.static(publicDirPath))

//setup handlebar engin and views location 
app.set('views', viewPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);


app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name : 'Raghu'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name: 'Raghu'
    });
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help Page',
        name:'Raghu'
    });
})


// app.get('',(req,res) => {
//     res.send('<h1>Weather</h1>');
// })

// app.get('/help',(req, res) => {
//     res.send({
//         name:'Raghu',
//         age : 27
//     });
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>Hi You are on about page</h1>');
// })

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You Must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address:req.query.address
            })

        })
    })

})

app.get('/product',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a serach term'
        })
    }
    console.log(req.query.search);
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: 'Error 404',
        name:'Raghu',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: 'Page error 404',
        name:'Raghu',
        errorMessage:'Page not found'
    })
})



//starting the server on the port 30000
app.listen(3000,()=>{
    console.log('server is up on port 3000')
});