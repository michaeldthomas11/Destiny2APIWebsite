let constants = require("./constants");
let Promise = require('bluebird');
let _ = require('lodash');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(constants.MANIFEST_PATH, sqlite3.OPEN_READONLY);

exports.getManifestDataAsync = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		db.serialize(function() {
			db.get('SELECT json from ' + tableName + ' where id + ' + constants.TO_UNSIGNED_INT_CONVERTER + ' = ' + id + ' OR id = ' + id, function(err, data) {
				if (err)
				{
					return reject(err);
				}
				return resolve(data);
			});
		});
		db.close();
	});	
};