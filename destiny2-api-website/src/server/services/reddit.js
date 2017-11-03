let express = require('express');
let _ = require('lodash');
let router = express.Router();
let Promise = require('bluebird');

// See this for why we need multiArgs: https://stackoverflow.com/questions/34796172/request-getasync-only-returns-1-parameters
let request = Promise.promisifyAll(require('request'), {multiArgs: true});
let url = "https://www.reddit.com/r/DestinyTheGame/hot/.json";

router.get('/hot', function (req, res) {
    let opts = {
        url: url
    };
    let limit = req.query.limit;
    // Only allow up to 25
    if (limit && limit <= 25) {
        opts.url = url + "?limit=" + limit;
    } else {
        // Default to 5 for now
        opts.url = url + "?limit=5";
    }
    request.getAsync(opts)
        .spread(function (resp, body) {
            let bodyObj = JSON.parse(body);
            let redditPosts = bodyObj.data.children;
            let posts = [];

            // Go through each post and collect the needed data
            _.forEach(redditPosts, function (item) {
                posts.push({
                    url: item.data.url,
                    title: item.data.title,
                    author: item.data.author,
                    time: item.data.created_utc * 1000
                });
            });
            let responseObj = {
                posts: posts
            };
            //return Promise.reject(new Error('this is a test')); // <-- Keeping this here for future testing, eventually add unit tests...
            res.send(responseObj);
        }).catch((err) => {
            res.status(500);
            res.send('Server Error - ' + err);
        }
    );
});

module.exports = router;
