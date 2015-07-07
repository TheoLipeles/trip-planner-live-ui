
function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key]);
	});
}

var days, currentDay;

$(document).ready(function () {
	$.ajax({
	    type: 'get',
	    url: '/days',
	    success: function (responseData) {
	        days = responseData;
	        if (days.length > 0) {
	        	currentDay = days[0];
		        days = days.map(function(day) {
		        	var dbHotel = all_hotels.filter(function(value) {
		        		return value._id === day.hotel;
		        	});
		        	if (dbHotel.length > 0) {
			        	day.hotel = new Hotel(dbHotel[0]);
			        }
		        	day.restaurants = day.restaurants.map(function(rId) {
		        		rId = all_restaurants.filter(function(value){
		        			return value._id === rId;
		        		});
		        		if (rId.length > 0) {
			        		return new Restaurant(rId[0]);
		        		}
		        	});
		        	day.thingsToDo = day.thingsToDo.map(function(thingId) {
		        		thingId = all_things_to_do.filter(function(value){
		        			return value._id === thingId;
		        		});
		        		if (thingId.length > 0) {
			        		return new ThingToDo(thingId[0]);
		        		}
		        	});
		        	return Day.buildOne(day);
		        });

		        currentDay = days[0];
		        currentDay.$button.addClass("current-day");
		    } else {
		    	currentDay = new Day();
		    	$.ajax({
				    type: 'post',
				    url: '/days',
				    data: {number: currentDay.number},
				    success: function (responseData) {
				    }
				});
		    	currentDay.$button.addClass("current-day");
		    }
	    }
	});
});