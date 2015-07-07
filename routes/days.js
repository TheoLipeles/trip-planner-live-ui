var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();

var models =  require('../models');
var Day = models.Day;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var ThingToDo = models.ThingToDo;

dayRouter.get("/" , function(req, res, next) {
	Day.find({}, function(err, data) {
		res.send(data);
	});
});

dayRouter.post("/" , function(req, res, next) {
	var newDay = new Day({number: req.body.number});
	newDay.save(function(err, document) {
		if (err) return console.log(err);
		res.send(document);
	});
});

dayRouter.get("/:id" , function(req, res, next) {
	
});

dayRouter.delete("/:id" , function(req, res, next) {

});

// .use
dayRouter.use("/:id" , attractionRouter);


attractionRouter.post("/hotel" , function(req, res, next) {
	Hotel.findOne({name: req.body.name}, function(err, data) {
		if (err) return console.log(err);
		var hotelId = data._id;
		Day.findOne({id: req.params.id}, function(err, data) {
			if (err) return console.log(err);
			data.hotel = hotelId;
			data.save(function(err, document) {
				if (err) return console.log(err);
				res.send(document);
			});
		});
	});
});

attractionRouter.delete("/hotel" , function(req, res, next) {
	Day.findOne({id: req.params.id}, function(err, data) {
		if (err) return console.log(err);
		data.hotel = null;
		data.save(function(err, document) {
			if (err) return console.log(err);
			res.send(document);
		});
	});
});

attractionRouter.post("/restaurants" , function(req, res, next) {
	Restaurant.findOne({name: req.body.name}, function(err, data) {
		if (err) return console.log(err);
		var restaurantId = data._id;
		Day.findOne({id: req.params.id}, function(err, data) {
			if (err) return console.log(err);
			data.restaurants.push(restaurantId);
			data.save(function(err, document) {
				if (err) return console.log(err);
				res.send(document);
			});
		});
	});
});

attractionRouter.delete("/restaurant/:rId" , function(req, res, next) {
	Day.findOne({id: req.params.id}, function(err, data) {
		if (err) return console.log(err);
		var index = data.restaurants.indexOf(req.params.rId);
		data.restaurants.splice(index, 1);
		data.save(function(err, document) {
			if (err) return console.log(err);
			res.send(document);
		});
	});
});

attractionRouter.post("/thingsToDo" , function(req, res, next) {
	ThingToDo.findOne({name: req.body.name}, function(err, data) {
		if (err) return console.log(err);
		var thingToDoId = data._id;
		Day.findOne({id: req.params.id}, function(err, data) {
			if (err) return console.log(err);
			data.thingsToDo.push(thingToDoId);
			data.save(function(err, document) {
				if (err) return console.log(err);
				res.send(document);
			});
		});
	});
});

attractionRouter.delete("/thingToDo/:thingId" , function(req, res, next) {
	Day.findOne({id: req.params.id}, function(err, data) {
		if (err) return console.log(err);
		var index = data.thingsToDo.indexOf(req.params.thingId);
		data.thingsToDo.splice(index, 1);
		data.save(function(err, document) {
			if (err) return console.log(err);
			res.send(document);
		});
	});
});

module.exports = dayRouter;

