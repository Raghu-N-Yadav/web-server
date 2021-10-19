const path = require('path');
const express = require('express');

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const app = express();
const publicDirPath = path.join(__dirname,'../public');

app.use(express.static(publicDirPath))

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
    res.send({
        forecast: 'Its dark out',
        location: 'Banglore'
    });
})




//starting the server on the port 30000
app.listen(3000,()=>{
    console.log('server is up on port 3000')
});