var ThingToDo;

$(document).ready(function () {
	ThingToDo = function (data) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.thingsToDo.push(this);
	};

	ThingToDo.buildAndSave = function (data) {
		var newThingToDo = new ThingToDo(data);
		var currentDayId;
		$.get("/days", function(data) {
			currentDayId = data.filter(function(value) {
				return value.number === currentDay.number;
			})[0]._id;
			$.ajax({
			    type: 'post',
			    url: '/days/' + currentDayId + "/thingsToDo",
			    data: {name: newThingToDo.name},
			    success: function (responseData) {
			    }
			});
		});
	};

	ThingToDo.prototype = generateAttraction({
		icon: '/images/star-3.png',
		$listGroup: $('#my-things-to-do .list-group'),
		$all: $('#all-things-to-do'),
		all: all_things_to_do,
		constructor: ThingToDo.buildAndSave
	});

	ThingToDo.prototype.delete = function () {
		var index = currentDay.thingsToDo.indexOf(this),
			removed = currentDay.thingsToDo.splice(index, 1)[0];
		removed
			.eraseMarker()
			.eraseItineraryItem();

		$.get("/days", (function(data) {
			currentDayId = data.filter(function(value) {
				return value.number === currentDay.number;
			})[0]._id;

			$.ajax({
			    type: 'delete',
			    url: '/days/' + currentDayId + "/thingToDo/" + this._id,
			    success: function (responseData) {
			    }
			});
		}).bind(this));
	};
});