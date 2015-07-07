var Hotel;

$(document).ready(function () {
	Hotel = function (data) {
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		if (currentDay.hotel && typeof(currentDay.hotel) !== "string") {
			currentDay.hotel.delete();
		}
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.hotel = this;
	};

	Hotel.buildAndSave = function (data) {
		var newHotel = new Hotel(data);
		var currentDayId;
		$.get("/days", function(data) {
			currentDayId = data.filter(function(value) {
				return value.number === currentDay.number;
			})[0]._id;
			$.ajax({
			    type: 'post',
			    url: '/days/' + currentDayId + "/hotel",
			    data: {name: newHotel.name},
			    success: function (responseData) {
			    }
			});
		});
	};

	Hotel.prototype = generateAttraction({
		icon: '/images/lodging_0star.png',
		$listGroup: $('#my-hotel .list-group'),
		$all: $('#all-hotels'),
		all: all_hotels,
		constructor: Hotel.buildAndSave
	});

	Hotel.prototype.delete = function () {
		$.get("/days", function(data) {
			currentDayId = data.filter(function(value) {
				return value.number === currentDay.number;
			})[0]._id;
			$.ajax({
			    type: 'delete',
			    url: '/days/' + currentDayId + "/hotel",
			    success: function (responseData) {
			    }
			});
		});
		currentDay.hotel
			.eraseMarker()
			.eraseItineraryItem();
		currentDay.hotel = null;
	};
});