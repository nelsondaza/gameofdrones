var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),

    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./server/data/data.sqlite'),
    //db = new sqlite3.Database(':memory:'),

    DatabaseController = require('./server/controllers/DatabaseController'),
    PlayerController = require('./server/controllers/PlayerController'),
    GameController = require('./server/controllers/GameController'),
    MoveController = require('./server/controllers/MoveController');

DatabaseController.setDB( db );
PlayerController.setDB( db );
GameController.setDB( db );
MoveController.setDB( db );

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use('/', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var router = express.Router();

router.get('/', function (req, res) {
	res.sendfile('./client/index.html');
});


app.get('/players', PlayerController.index);
app.get('/players/create', PlayerController.create);
app.get('/players/:id', PlayerController.show);
app.get('/players/:id/edit', PlayerController.edit);
app.post('/players', PlayerController.store);
app.put('/players/:id', PlayerController.update);
app.delete('/players/:id', PlayerController.destroy);

app.get('/games', GameController.index);
app.get('/games/create', GameController.create);
app.get('/games/:id', GameController.show);
app.get('/games/:id/edit', GameController.edit);
app.post('/games', GameController.store);
app.put('/games/:id', GameController.update);
app.delete('/games/:id', GameController.destroy);

app.get('/moves', MoveController.index);
app.get('/moves/create', MoveController.create);
app.get('/moves/:id', MoveController.show);
app.get('/moves/:id/edit', MoveController.edit);
app.post('/moves', MoveController.store);
app.put('/moves/:id', MoveController.update);
app.delete('/moves/:id', MoveController.destroy);


app.use(router);

app.listen(3000, function () {
	console.log("Node server running on http://localhost:3000");
});