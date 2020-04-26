//require path
var path = require('path');

//HTML Routes
module.exports = function(app){
//Get route which displays survey
 app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/survey.html'));
  });

 //route which displays homepage
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/../public/home.html'));
  });

  //default to home if no route typed in
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

};