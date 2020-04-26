//require friends.js from data folder
var friendList = require('../data/friends.js');

//routing from express
module.exports = function(app) 
{
    app.get('/api/friends', function (req, res) {
        res.json(friendList);
    });
//POST which hanldles survey results
    app.post('/api/friends', function(req, res) {

        var addFriend = req.body;

        for (var i = 0;i < addFriend.scores.length; i++) {
            if(addFriend.scores[i] == "1 (Strongly Disagree)")
            {
                addFriend.scores[i]=1;
            }
            else if(addFriend.scores[i] == "2 (Slightly Disagree)")
            {
                addFriend.scores[i]=2;
            }
            else if(addFriend.scores[i] == "3 (Neither Agree nor Disagree)")
            {
                addFriend.scores[i]=3;
            }
            else if(addFriend.scores[i] == "4 (Slightly Agree)")
            {
                addFriend.scores[i]=4;
            }
            else if(addFriend.scores[i] == "5 (Strongly Agree)")
            {
                addFriend.scores[i]=5;
            }
        }
        //array to compare matches
        var friendMatches =[];

        for(var i=0; i < friendList.length; i++) {
            var compareFriend = friendList[i];

            var difference = 0;

            for (var j=0; j < compareFriend.scores.length; j++) {
                var scoreDiff = Math.abs(compareFriend.scores[j] - addFriend.scores[j]);
                difference += scoreDiff;
            }

            friendMatches[i] = difference;
        }

        var closestFriend = friendMatches[0];
        var closestFriends = 0;

        for(var i = 1; i < friendMatches.length; i++) {
            if(friendMatches[i] < closestFriend) {
                closestFriend = friendMatches[i];
                closestFriends = i;
            }
        }
        friendList.push(addFriend);
        res.json(friendList[closestFriends]);
    });
};