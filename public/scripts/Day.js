var Day;

$(document).ready(function () {

	// Creates a day constructor
	Day = function () {
		this.hotel = null;
		this.restaurants = [];
		this.thingsToDo = [];
		// Day number (always equal to number of days)
		this.number = days.push(this);

		this.buildButton()
			.drawButton();
	};

	Day.buildOne = function(data) {
		var newDay = new Day();
		newDay.hotel = data.hotel;
		newDay.restaurants = data.restaurants;
		newDay.thingsToDo = data.thingsToDo;
		newDay.number = data.number;

		newDay.$button.text(newDay.number);
		return newDay;
	};

	// makes the day button dom element and click handler
	Day.prototype.buildButton = function () {
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		this.$button.on('click', function () {
			self.switchTo();
		});
		return this;
	};

	Day.prototype.drawButton = function () {
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	Day.prototype.eraseButton = function () {
		this.$button.detach();
		return this;
	};


	// is called on a day to switch to that day
	Day.prototype.switchTo = function () {
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}
		// erases all the current events
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		currentDay.restaurants.forEach(eraseOne);
		currentDay.thingsToDo.forEach(eraseOne);

		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		// draws all the events from the day that has been clicked on
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);

		// changes class of new day button to current-day removes current-day class from old day button
		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		$('#day-title > span').text('Day ' + this.number);
		currentDay = this;
	};


	function deleteCurrentDay () {
		if (days.length > 1) {
			// removes previous day and sets current day equal to the subsequent day
			var index = days.indexOf(currentDay),
				previousDay = days.splice(index, 1)[0],
				newCurrent = days[index] || days[index - 1];
			// resets the day numbers
			days.forEach(function (day, idx) {
				day.number = idx + 1;
				day.$button.text(day.number);
			});
			// switches to the new current day
			newCurrent.switchTo();
			// erases previous day button
			previousDay.eraseButton();
		}
	}

	$('#add-day').on('click', function () {
		var newDay = new Day();
		$.ajax({
		    type: 'post',
		    url: '/days',
		    data: {number: newDay.number},
		    success: function (responseData) {
		    }
		});
	});

	$('#day-title > .remove').on('click', deleteCurrentDay);
});