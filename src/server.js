const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');

// set EJS as templating engine
app.set('view engine', 'ejs');


// give access to 'public' folder from '/static' url's pathname
app.use('/static', express.static('public'));

app.listen(port, () => {
    console.log(`Le serveur écoute sur http://localhost:8080`)
})

// route to display the home page
app.get('/', (req, res) => {
    res.redirect('/static/index.html');
});

// route to display the home page whatever the url's pathname
app.get('/index*', (req, res) => {
    res.redirect('/static/index.html');
});


// count for the 'images' page

let imagesRouteCounter = 0;
app.get('/images', (req, res) => {

    imagesRouteCounter++;

    let images = []; 
    images = fs.readdirSync('./public/images');
    res.render('images',{images, imagesRouteCounter});
});


// route to display the image page

app.get('/image/:id', (req, res) => {
    let imageId = req.params.id;

    images = fs.readdirSync('./public/images');

    res.render('image', { imageId, images });
});
