let express = require('express');
let _ = require('lodash');
let router = express.Router();
let Promise = require('bluebird');
let constants = require('../constants');
let manifest = Promise.promisifyAll(require('../manifest'), {multiArgs: true});

// See this for why we need multiArgs: https://stackoverflow.com/questions/34796172/request-getasync-only-returns-1-parameters
let request = Promise.promisifyAll(require('request'), {multiArgs: true});
let destiny2CharacterRequest = 'https://bungie.net/Platform/Destiny2/SearchDestinyPlayer/membership_type/display_name';
let destiny2CharacterRequest2 = 'https://bungie.net/Platform/Destiny2/membership_type/Profile/membership_id?components=100,%2C200,%2C205';

router.get('/:membership_type/:display_name', function (req, res) {
    let membershipType = req.params.membership_type;
	let displayName = req.params.display_name;
	let destiny2CharacterRequest = 'https://bungie.net/Platform/Destiny2/SearchDestinyPlayer/' + membershipType + '/' + displayName;
	let opts = {
        url: destiny2CharacterRequest,
		headers: {
            'X-API-KEY': constants.API_KEY
        }
    };
    request.getAsync(opts)
        .spread(function (resp, body) {
            let bodyObj = JSON.parse(body);
            let membershipId = bodyObj.Response[0].membershipId;
			let destiny2CharacterRequest2 = 'https://bungie.net/Platform/Destiny2/' + membershipType + '/Profile/' + membershipId + '?components=100,%2C200,%2C205';
			let opts = {
				url: destiny2CharacterRequest2,
				headers: {
				'X-API-KEY': constants.API_KEY
				}
			};
			request.getAsync(opts).spread(function (resp, body) {
				let bodyObj = JSON.parse(body);
				
				let response = {
					'membershipId': membershipId,
					'membershipType': membershipType,
					'displayName':displayName,
					'characters':[]
				}
				for (let i = 0; i < bodyObj.Response.profile.data.characterIds.length; i++)
				{
					response.characters.push({'characterId': bodyObj.Response.profile.data.characterIds[i]});
				}
				//res.send(response);
				//res.send(response);
				for (let i = 0; i < response.characters.length; i++)
				{
					/*response.characters[i].race = manifest.getManifestDataAsync('DestinyRaceDefinition', bodyObj.Response.characters.data[response.characters[i].characterId].raceHash).then(function(data){
						let data = data.json.displayProperties;
						return data.json.displayProperties.name;
					});*/
					/*response.characters[i].gender = manifest.getManifestDataAsync('DestinyGenderDefinition',bodyObj.Response.characters.data[response.characters[i].characterId].genderHash);
					response.characters[i].classType = manifest.getManifestDataAsync('DestinyClassDefinition',bodyObj.Response.characters.data[response.characters[i].characterId].classType);
					response.characters[i].emblemBackgroundPath = bodyObj.Response.characters.data[response.characters[i].characterId].emblemBackgroundPath;
					response.characters[i].light = bodyObj.Response.characters.data[response.characters[i].characterId].light;
					response.characters[i].baseCharacterLevel = bodyObj.Response.characters.data[response.characters[i].characterId].baseCharacterLevel;*/
				}
				res.send(response);
			}).catch((err) => {
				res.status(500);
				res.send(err);
			});
			
			
            /*// Go through each post and collect the needed data
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
            };*/
            //return Promise.reject(new Error('this is a test')); // <-- Keeping this here for future testing, eventually add unit tests...
        }).catch((err) => {
            res.status(500);
            res.send(err);
        }
    );
});

module.exports = router;
