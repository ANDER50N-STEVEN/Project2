var express = require('express');
var app = express();

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://steven:password@localhost:5432/apartments";
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 8000));
app.use(express.static('/public'));
app.set("views", "views");
app.set("view engine", "ejs");
app.get("/home", function(req, res){
	console.log('recieved request for home page');
		res.render("home");
});
app.get('/minPrice', minPrice);
app.get('/maxPrice', maxPrice);
app.get('/bedrooms', bedrooms);
app.get('/bathrooms', bathrooms);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



function minPrice(req, res) {
	var min = req.query.value;

	 getMinFromDb(min, function(error, result) {
		if (error || result == null || result.length != 1) {
			 res.status(500).json({success: false, data: error});
		 } else {
			 var person = result[0];
			 res.status(200).json(result[0]);
		}
	 });
}
function getMinFromDb(min, callback) {
	console.log("Getting Rentals with " + min + " as lowest price.");

		var sql = "SELECT address, price, bed, bath FROM markers WHERE price >= $1::int";
	var params = [min];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

} 
function maxPrice(req, res) {
	var max = req.query.value;

	 getMaxFromDb(max, function(error, result) {
		if (error || result == null || result.length != 1) {
			 res.status(500).json({success: false, data: error});
		 } else {
			 var person = result[0];
			 res.status(200).json(result[0]);
		}
	 });
}
function getMaxFromDb(max, callback) {
	console.log("Getting Rentals with " + max + " as max price.");

		var sql = "SELECT address, price, bed, bath FROM markers WHERE price <= $1::int";
	var params = [max];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

} 
function bedrooms(req, res) {
	var bed = req.query.value;

	 getBedsFromDb(bed, function(error, result) {
		if (error || result == null || result.length != 1) {
			 res.status(500).json({success: false, data: error});
		 } else {
			 var person = result[0];
			 res.status(200).json(result[0]);
		}
	 });
}
function getBedFromDb(bed, callback) {
	console.log("Getting Rentals with at least " + bed + " bedrooms.");

		var sql = "SELECT address, price, bed, bath FROM markers WHERE bed >= $1::int";
	var params = [bed];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

} 
function bathrooms(req, res) {
	var bath = req.query.value;

	 getBathFromDb(bath, function(error, result) {
		if (error || result == null || result.length != 1) {
			 res.status(500).json({success: false, data: error});
		 } else {
			 var person = result[0];
			 res.status(200).json(result[0]);
		}
	 });
}
function getBathFromDb(bath, callback) {
	console.log("Getting Rentals with at least " + bath + " bathrooms.");

		var sql = "SELECT address, price, bed, bath FROM markers WHERE bath >= $1::int";
	var params = [bath];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

} 
