const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const keys = require('../constants/keys');




const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join('../templates/partials');

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsDirectory)

app.use(express.static(publicDirectory));

app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Welcome',
        name:'me'
    })
})
app.get('/about', (req, res)=> {
    res.render('about', {
        title:'About',
        name:'me'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        res.send({
            err: 'you must provide an address'
        })
    } else{

        geocode(req.query.address, keys.geoKey, (err, response)=> {
            if(err) {
               return res.send({err})
            } else {
                forecast(response,keys.forecastKey, (err, response)=>{
                    if(err){
                        return res.send({err})
                    } else {
                        res.send({
                            response
                        })
                    }
                })
            }
        })

       
    }
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: 'Page not Found'
    })
})

app.listen(3000, ()=> {
    console.log('listening on port 3000')
})

