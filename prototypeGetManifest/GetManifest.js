var request = require("request");
var requestp = require("request-promise");
var fs = require("fs");

var baseUrl = 'https://www.bungie.net';
var apiKey = 'fb2decc2a49c4e2fbb1d03f51b2e5ef9';
var endpointUrl = '';
//endpointUrl = '/common/destiny2_content/sqlite/en/world_sql_content_c423afdd29d2f6acb8ac2c859aeb4958.content';

var req = request.defaults({
    headers: {
        'X-Api-Key': apiKey
    }
});

var fileStream = fs.createWriteStream('manifest.zip');

const options = {
    method: 'GET',
    uri: baseUrl + '/Platform/Destiny2/Manifest/',
    json: true,
    headers: {
        'X-Api-Key': apiKey
    }
};

requestp(options)
    .then(function (response) {
        var manifestUrl = response.Response.mobileWorldContentPaths.en;
        console.log(manifestUrl);
        return manifestUrl;
    }).then(function(url) {
        req.get(baseUrl + url)
            .on('error', function(err) {
                console.log(err)
            })
            .pipe(fileStream);
    })
    .catch(function (err) {
        console.log(err.message);
    });