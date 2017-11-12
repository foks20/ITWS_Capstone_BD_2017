var express = require('express');
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var path = __dirname + '/views/';

// Routing

router.use(function (req, res, next) {
	// console.log('/' + req.method);
	next();
});

router.get('/', function(req, res) {
	res.sendFile(path + 'index.html');
});

router.get('/event.html', function(req, res) {
	res.sendFile(path + 'event.html');
});

router.get('/approval.html', function(req, res){
	res.sendFile(path + 'approval.html')
});

router.get('/itlp.html', function(req, res){
	res.sendFile(path + 'itlp.html')
});

// router.get('/about', function(req, res) {
// 	res.sendFile(path + 'about.html');
// });

// router.get('/contact', function(req, res) {
// 	res.sendFile(path + 'contact.html');
// });

app.use('/', router);

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/controllers'));

// app.use('*', function(req, res) {
// 	res.sendFile(path + '404.html');
// });

// Connect to MongoDB

var dburl = 'mongodb://localhost:27017/bd'
MongoClient.connect(dburl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to MongoDB");
    // Clear events and insert new ones - for testing purposes
    db.collection('events').drop()
    insertEvents(db, function() {});
    
    router.get('/events', function(req, res) {
    findEvents(db, function(docs) {
        res.send(docs);
        console.log('GET: events');
    });
});
});

// Events

var insertEvents = function(db, callback) {
    var events = db.collection('events');
    events.insertMany([
        {name: "Philanthropy Hosting Event", details: "It's a philanthropy thingy.", contactName: "Jane Smith", contactEmail: "smithj@bd.com", points: "300", committee: "Philanthropy"},
        {name: "Second Round Interview Participation", details: "Recruitment is life.", contactName: "Jane Smith", contactEmail: "smithj@bd.com", points: "250", committee: "Recruiting"},
        {name: "Time Sheet Compliance", details: "For the non-existant hourly ITLPs.", contactName: "Jane Smith", contactEmail: "smithj@bd.com", points: "100", committee: "Initiatives/Training"},
        {name: "Annual Meeting Planning", details: "Everyone loves meetings about meetings.", contactName: "Jane Smith", contactEmail: "smithj@bd.com", points: "200", committee: "Marketing"}
    ], function(err, result) {
        assert.equal(null, err);
        assert.equal(4, result.result.n);
        assert.equal(4, result.ops.length);
        console.log("Inserted 4 events");
        callback(result);
    });
}

var findEvents = function(db, callback) {
    var events = db.collection('events');
    events.find({}).toArray(function(err, docs) {
        assert.equal(null, err);
        assert.equal(4, docs.length);
        console.log("Retrieved Events");
        callback(docs);
    });
}


app.listen(3000, function() {
	console.log('Live at port 3000');
});