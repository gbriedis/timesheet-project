const express = require('express')
const axios = require('axios').default;
let bodyParser = require('body-parser')
const app = express();

let PORT = 3000
app.use(bodyParser.json())

// Static Files
app.use(express.static('public'));
app.use('/style', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/views', express.static(__dirname + 'public/views'))

// Load Index Webpage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html')
})

// Load Index Webpage
app.get('/addShift', (req, res) => {
    res.sendFile(__dirname + '/public/views/addShift.html')
})


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});