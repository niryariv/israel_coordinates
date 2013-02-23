var fs		= require('fs');
var csv 	= require('csv');
var http	= require('http');
var util	= require('util');
var request = require('request');


var data = new Array();

csv()
.from.stream(fs.createReadStream(__dirname+'/locations.csv'))
.on('record', function(record, index){
	
	// if (index < 10) 
	check_place(record, index);
});


function check_place(record, index) {
	// console.log('checking ' + place);
	place = record[0];
	url = "http://nominatim.openstreetmap.org/search?format=json&city=" + place;
	// console.log(record);

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			obj = JSON.parse(body);
			
			if (obj.length >0) {
				record.push(obj[0].lat); 
				record.push(obj[0].lon);
			}
		} else {
			console.log("Got error: " + error);
		}

		data[index] = record;
	});
}


process.on('exit',	
	function () {
		// this is obviously not the clean way to do it, but new to Node,js, cut me some slack.
		out = "";
		for (i in data) {
			out += JSON.stringify(data[i]).replace("[","").replace("]","") + "\n";
		}
		fs.writeFileSync(__dirname+'/locations_with_coords.csv', out);
	}
);


// Processing 1098 locations:
// localhost:israel_coordinates niryariv$ date; node parse.js ; date
// Sat Feb 23 15:33:19 IST 2013
// Got error: Error: socket hang up
// Sat Feb 23 15:37:25 IST 2013