var fb = require("./FacebookAds.js");

var FacebookAds = function(){};

FacebookAds.prototype = {
	configs: {},
	instances: {},
	
	addConfig: function(name, config) {
		this.configs[name] = config;
	},
	
	getInstance: function(name) {
		if(typeof(name) === "undefined")
			name = "default";
		
		if(!(name in this.instances)){
			this.instances[name] = new fb.FacebookAds(this.configs[name]);
		}

		return this.instances[name];
	}

};

 /*CREATE TEMPORARY TABLE tmp SELECT * FROM  campaigns WHERE id = 391;
UPDATE tmp SET id=1000 WHERE id = 391;
INSERT INTO campaigns SELECT * FROM tmp WHERE id = 1000; for copy table data*/

module.exports = new FacebookAds();