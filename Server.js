var express = require('express');
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var assert = require('assert');
var path = __dirname + '/views/';

// Default starting amount
var numEvents = 4;

// Routing

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function(req, res) {
	res.sendFile(path + 'index.html');
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
    db.collection('events').drop();
    db.collection('users').drop();
	db.collection('approvals').drop();
    insertEvents(db, function() {
        findEvents(db, function(events) {
            insertUsers(db, events, function() {});
        });
    });

    router.post('/createEvent', function (req, res) {
        console.log(req);
        db.collection('events').insertOne(req.body, 
            function(err, result) {
                assert.equal(null, err);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                console.log('POST: createEvent');
                numEvents++;
                res.send('Data received:\n' + JSON.stringify(req.body));
            }
        );
    });

    // Routing to get events
    router.get('/events', function(req, res) {
        // Get a particular set of events by IDs
        if ("id" in req.query) {
            findSpecificEvents(db, JSON.parse(req.query.id), function(docs) {
                res.send(docs);
                console.log('GET: events by id');
            })
        } else {
            findEvents(db, function(docs) {
                res.send(docs);
                console.log('GET: events');
            });
        }
    });

    router.get('/users', function(req, res) {
        findUsers(db, function(docs) {
            res.send(docs);
            console.log('GET: users');
        });
    });
	
	router.get('/approvals', function(req, res) {
        var users = db.collection('approvals');
		users.find({}).toArray(function(err, docs) {
			assert.equal(null, err);
			res.send(docs);
			console.log("Retrieved Approvals");
		});
    });
	
	router.post('/signUp', function(req, res) {
		var approvals = db.collection('approvals');
		try {
			approvals.insertOne( req.body , function(err, result) { res.send('Data received:\n' + JSON.stringify(req.body)); });
		} catch (e) {
			print (e.stack);
		};
	})
	
	router.post('/approveEvent', function(req, res) {
		var users = db.collection('users');
        var compareID = ObjectID(req.body.id);
	    if (users.findAndModify({
            query: {_id: compareID},
			new: true,
			update: { $addToSet: {events: req.body.eventID}, $inc: { points: req.body.points}}
		}) != null)
		{
			// Remove from the approvals board
			var app = db.collection('approvals');
			if ( app.findAndModify({ query: {_id: compareID}, remove: true }) != null ) {
				return true;
			}
		}
	});
});

// User(s)

var insertUsers = function(db, events, callback) {
    // Need event IDS to link signed up events
    var eventIDs = []
    var count = 0;
    for (event in events) {
        eventIDs.push(events[event]._id);
        count++;
        if (count == 2) {break;}
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
        assert.equal(numEvents, docs.length);
        console.log("Retrieved Events");
        callback(docs);
    });
}

// Pulls specific events by the IDs in array 'id'
var findSpecificEvents = function(db, id, callback) {
    var events = db.collection('events');
    for (i in id) {
        id[i] = ObjectID(id[i]);
    }
    events.find({
        _id: {
            $in: id
        }
    }).toArray(function(err, docs) {
        assert.equal(null, err);
        assert.equal(id.length, docs.length);
        console.log("Retrieved Events by id");
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