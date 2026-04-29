// const path = require('path');
// const express = require('express');
// const hbs = require('hbs');
import path from 'path';
import express from 'express';
import hbs from 'hbs';
import 'dotenv/config';
import geocode from './utils/geocode.js';
import forcast from './utils/forcast.js';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000;
// const geocode = require("./utils/geocode").default;
// const forcast = require("./utils/forcast");

// console.log(__dirname)
const __filename = fileURLToPath(import.meta.url);

// recreate __dirname
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, '../public'))

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

//way of creating routes
app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Logesh Velu'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name:'Logesh Velu',
        helpText:'Emergency Help me'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Logesh Velu'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if(error){ return res.send({error})}

            res.send({
                forcast:forcastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send([{
    //     forcast:'It is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address
    // }]);
})
app.get('/products', (req, res) => {
    if(!req.query.search){   //we have to call http://localhost:3000/products?game=cricket&rating=1
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search) //search params
    res.send({
        products:[]
    });
})

app.use('/help', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    });
});

app.use((req, res) => {
    res.status(404).render('404', {
        title:'404',
        name:'Logesh Velu',
        errorMessage:'Page not found'
    })
})
//to run application in particular port
app.listen(port, ()=> {
    console.log('Server running on port '+ port)
}) 

// export default app;// for vercel