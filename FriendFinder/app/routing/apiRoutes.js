var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {
	console.log("___ENTER apiRoutes.js___");

	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		var input = req.body;
		console.log("input = " + JSON.stringify(input));
		var responses = input.answers;
		var matchName = "";
		var matchImage = "";
        var difference = 10000;
        
		for (var i = 0; i < friends.length; i++) {
			console.log('friend = ' + JSON.stringify(friends[i]));
			var newDiff = 0;
			for (var j = 0; j < responses.length; j++) {
				newDiff += Math.abs(friends[i].answers[j] - responses[j]);
            }
            
			if (newDiff < difference) {
				difference = newDiff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
        }
        
		friends.push(input);
        res.json({matchName: matchName, matchImage: matchImage});
        
    });
    
};