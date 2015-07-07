var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();

var Day = require('../models').Day;

dayRouter.get("/" , function(req, res, next) {
	$.ajax({
		type: "get",
		url: "/",
		data: [],
		success: function() {
			res.sendStatus(200);
		}
	});
});

dayRouter.post("/" , function(req, res, next) {

});

dayRouter.get("/:id" , function(req, res, next) {
});

dayRouter.delete("/:id" , function(req, res, next) {

});

// .use
dayRouter.use("/:id" , attractionRouter);


attractionRouter.post("/hotel" , function(req, res, next) {

});

attractionRouter.delete("/hotel" , function(req, res, next) {

});

attractionRouter.post("/restaurants" , function(req, res, next) {

});

attractionRouter.delete("/restaurant/:id" , function(req, res, next) {

});

attractionRouter.post("/thingsToDo" , function(req, res, next) {

});

attractionRouter.delete("/thingsToDo/:id" , function(req, res, next) {

});

module.exports = dayRouter;

