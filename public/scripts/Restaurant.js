var Restaurant;

$(document).ready(function () {
	Restaurant = function (data) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.restaurants.push(this);
	};

	Restaurant.buildAndSave = function (data) {
		var newRestaurant = new Restaurant(data);
		var currentDayId;
		$.get("/days", function(data) {
			currentDayId = data.filter(function(value) {
				return value.number === currentDay.number;
			})[0];
			$.ajax({
			    type: 'post',
			    url: '/days/' + currentDayId + "/restaurants",
			    data: {name: newRestaurant.name},
			    success: function (responseData) {
			    }
			});
		});
	};

	Restaurant.prototype = generateAttraction({
		icon: '/images/restaurant.png',
		$listGroup: $('#my-restaurants .list-group'),
		$all: $('#all-restaurants'),
		all: all_restaurants,
		constructor: Restaurant.buildAndSave
	});

	Restaurant.prototype.delete = function () {
		var index = currentDay.restaurants.indexOf(this),
			removed = currentDay.restaurants.splice(index, 1)[0];
		removed
			.eraseMarker()
			.eraseItineraryItem();
		$.get("/days", (function(data) {
			currentDayId = data.filter(function(value) {
				return value.number === currentDay.number;
			})[0];

			$.ajax({
			    type: 'delete',
			    url: '/days/' + currentDayId + "/restaurant/" + this._id,
			    success: function (responseData) {
			    }
			});
		}).bind(this));
	};
});