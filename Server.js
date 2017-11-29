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

app.use('/', router);

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/css'));

// Connect to MongoDB

var dburl = 'mongodb://localhost:27017/bd'
MongoClient.connect(dburl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to MongoDB");
    // Clear events and user and insert new ones - for testing purposes
    db.collection('events').drop()
    db.collection('users').drop();
    insertEvents(db, function() {
        findEvents(db, function(events) {
            insertUsers(db, events, function() {});
        });
    });

    // Routing to get events
    router.get('/events', function(req, res) {
        findEvents(db, function(docs) {
            res.send(docs);
            console.log('GET: events');
        });
    });

    router.get('/users', function(req, res) {
        findUsers(db, function(docs) {
            res.send(docs);
            console.log('GET: users');
        });
    });
});

// User(s)

var insertUsers = function(db, events, callback) {
    // Need event IDS to link signed up events
    var eventIDs = []
    for (event in events) {
        eventIDs.push(events[event]._id);
    }

    var users = db.collection('users');
    users.insertMany([
        {name: "John Doe", role:"itlp", image: "profile_pic.png", points: "7000", events: eventIDs},
        {name: "Jane Doe", role:"lead", image: "profile_pic.png", points: "4000", events: eventIDs}
    ], function(err, result) {
        assert.equal(null, err);
        assert.equal(2, result.result.n);
        assert.equal(2, result.ops.length);
        console.log("Inserted 2 users");
        callback(result);
    });
}

// Events

var insertEvents = function(db, callback) {
    var events = db.collection('events');
    events.insertMany([
        {name: "Philanthropy Hosting Event", details: "It's a philanthropy thingy.", contactName: "Jane Smith", contactEmail: "smithj@bd.com", points: "300", committee: "Philanthropy"},
        {name: "Second Round Interview Participation", details: "Recruitment is life.", contactName: "Jane Smith", contactEmail: "smithj@bd.com", points: "250", committee: "Recruiting"},
        {name: "Time Sheet Compliance", details: "For the non-existant hourly ITLPs.", contactName: "Jane Smith", contactEmail: "smithj@bd.com", points: "100", committee: "Training"},
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

var findUsers = function(db, callback) {
    var users = db.collection('users');
    users.find({}).toArray(function(err, docs) {
        assert.equal(null, err);
        assert.equal(2, docs.length);
        console.log("Retrieved Users");
        callback(docs);
    });
}


app.listen(3000, function() {
	console.log('Live at port 3000');
});