const express = require('express')
const axios = require('axios').default;
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient
const app = express();
const uri = "mongodb+srv://gbriedis:strongpw@cluster0.pr4ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const PORT = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extennded: true }));

// Connect to the database
let database
mongoClient.connect(uri, function(err,client){
    database = client.db('timesheet-db')
})

// parameter blueprint
app.param('collectionName', function(req,res,next,collectionName){
    req.collection = database.collection(collectionName)
    return next()
})

//get Database data of the appropriate collection name
app.get('/collection/:collectionName',function(req,res,next){
    req.collection.find({}).toArray(function(err,results){
        if (err){
            return next(err)
        }
        else{
            res.send(results)
        }
    })
})

//saves new order to the placedOrdersDB database
app.post('/collection/:collectionName',function(req,res,next){
    let data = {
        date: req.body.date,
        shiftNumber: req.body.shiftNumber,
        hours: parseInt(req.body.hours),
        crewChief_bonus: req.body.crewChief_bonus,
        nightShift_bonus: req.body.nightShift_bonus,
        outOfBounds_bonus: req.body.outOfBounds_bonus
    }

    req.collection.insertOne(data,function(err,result){
        if (err){
            return next(err)
        }
        else{
            res.send("successfully added to the Database")
        }
    })
})

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

app.get('/site.json', (req, res) => {
    res.sendFile(__dirname + '/site.json')
})

// Load Add Shift Form Webpage
app.get('/addShift', (req, res) => {
    res.sendFile(__dirname + '/public/views/addShift.html')
})


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});