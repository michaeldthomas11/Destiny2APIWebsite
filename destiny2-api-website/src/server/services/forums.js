//Declare some stuff
let express = require('express');
let router = express.Router();
let Promise = require('bluebird');
let _ = require('lodash');
let request = Promise.promisifyAll(require('request'), {multiArgs: true});

//let-iables(Variables) <-There is a funny story about this. This could be the new 'fetch'!

let constants = require("../constants");

let MAX_POSTS = 5;
let pageNmbr = 0;
let sortMode = 3;
let quickDate = 4;
let categoryFilter = 0;

// Put forum endpoints here:
router.get('/trending', function (req, res) {
    let opts = {
        url: constants.BASE_URL + 'Forum/GetCoreTopicsPaged/' +
        pageNmbr + '/' +
        sortMode + '/' +
        quickDate + '/' +
        categoryFilter + '/?locales=en',
        headers: {
            'X-API-KEY': constants.API_KEY
        }
    };
    request.getAsync(opts)
        .spread(function (resp, body) {
            let bodyObj = JSON.parse(body);
            let d2Posts = bodyObj.Response.results;
            let d2Authors = bodyObj.Response.authors;
            let posts = [];

            // Go through first 5 posts and collect the needed data
            for (let i = 0; i < MAX_POSTS; ++i) {

                let test = _.findIndex(d2Authors, function (test) {
                    return test.membershipId === d2Posts[i].authorMembershipId;
                });
                //Parsing to Unix Time Stamp
                let timeStamp = Date.parse(d2Posts[i].creationDate);

                posts.push({
                    subject: d2Posts[i].subject,
                    author: d2Authors[test].displayName,
                    postId: d2Posts[i].postId,
                    creation: timeStamp,
                    url: 'https://www.bungie.net/en/Forums/Post/' + d2Posts[i].postId + '?sort=0&page=0'
                });
            }
            let responseObj = {
                posts: posts
            };

            //Used to test error handling.
            //return Promise.reject(new Error('this is a test'));
            res.send(responseObj);
        }).catch((err) => {
            res.status(500);
            res.send('Server Error - ' + err);
        });
});

module.exports = router;
