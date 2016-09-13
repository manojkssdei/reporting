var https = require('https'),
	querystring = require('querystring'),
	LoudDoor 	= require('util');
	
 
var FacebookAds = function(config){
	this.config = config; 
};
 

FacebookAds.prototype = { 
	config: null,
	TEST_MODE:true,
	CAMPAIGN_STATUS_ACTIVE: 1,
	CAMPAIGN_STATUS_PAUSED: 2,
	CAMPAIGN_STATUS_DELETED: 3,
	
	GROUP_STATUS_ACTIVE: 1,
	GROUP_STATUS_DELETED: 3,
	GROUP_STATUS_PENDING_REVIEW: 4,
	GROUP_STATUS_DISAPPROVED: 5,
	GROUP_STATUS_CAMPAIGN_PAUSED: 8,
	GROUP_STATUS_ADGROUP_PAUSED: 9,
	
	BID_TYPE_CPC: 1,
	BID_TYPE_CPM: 2,
	BID_TYPE_GOAL_OPTIMIZATION: 7,
	
	TARGETING_GENDER_MALE: 1,
	TARGETING_GENDER_FEMALE: 2,
	
	TARGETING_RELATIONSHIP_SINGLE: 1,
	TARGETING_RELATIONSHIP_IN_RELATIONSHIP: 2,
	TARGETING_RELATIONSHIP_MARRIED: 3,
	TARGETING_ENGAGED: 4,
	
	createAdGroup: function(settings, cb) {
		
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			
			return this;
		}
		
		if(typeof(settings.creative) !== "string")
		{
			settings.creative = JSON.stringify(settings.creative);
		}
		if(typeof(settings.targeting) !== "string")
		{
			settings.targeting = JSON.stringify(settings.targeting);
		}
			
		this.makeRequest(
			"/v2.6/act_" + settings.account_id + "/adsets", 
			settings, 
			cb,
			"POST"
		);
	},
	addimage:function(settings, cb) {	
			
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/adimages", 
			settings, 
			cb,
			"POST"
		);
	},
	checkamount: function(settings, cb) {	
			
		this.makeRequest(
			"/v2.6/act_" + settings.account_id + "/minimum_budgets", 
			settings, 
			cb
			
		);
	},
	addvideos:function(settings, cb) {
	    this.makeRequest(
			"/v2.6/act_" + settings.account_id + "/advideos", 
			settings, 
			cb,
			"POST"
		);
	},
    createAd: function(settings, cb) {
		
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			
			return this;
		}
		
		if(typeof(settings.creative) !== "string")
		{
			settings.creative = JSON.stringify(settings.creative);
		}
		if(typeof(settings.targeting) !== "string")
		{
			settings.targeting = JSON.stringify(settings.targeting);
		}
		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/ads",
			//"https://graph.facebook.com/v2.6/6049858000217/ads",
			settings, 
			cb,
			"POST"
		);
	},
	
	editAdGroup: function(settings, cb) {
		
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
		}
		
		if (!settings.id)
		{
			cb(new Error("Can not edit ad group without specifying the ad group FBID"), null);
		}
		
		if (settings.targeting && typeof settings.targeting !== 'string')
		{
			settings.targeting = JSON.stringify(settings.targeting);
		}
		
		var id = settings['id'];
		delete settings['id'];
		
		this.makeRequest(
			"/" + id,
			settings,
			cb,
			"POST"
		);
	},
	
	pauseAdGroup: function(adGroupId, cb)
	{
		if (adGroupId === undefined || (typeof adGroupId === 'function' && cb === undefined))
		{
			cb(new Error("Must specify group ID to pause"), null);
			
			return this;
		}
		
		this.makeRequest(
			"/" + adGroupId,
			{
				adgroup_status: this.GROUP_STATUS_ADGROUP_PAUSED
			},
			cb,
			"POST"
		);
	},
	
	createAdCampaign: function(settings, cb) {
		
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			
			return this;
		}
		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/campaigns", 
			settings, 
			cb,
			"POST"
		);
	},
	getCampaign: function(settings, cb) {
		
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			
			return this;
		}
		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/campaigns", 
			settings, 
			cb
		);
	},
	getreportCampaign:function(settings, cb) {
		
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/insights", 
			//"https://graph.facebook.com/v2.6/6057407288280/insights",
			settings, 
			cb
			//"POST"
		);
	},
	getreportCampaignlevel:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.campaignid + "/insights", 
			settings, 
			cb
		);
	},	
	getfacebookpixcel:function(settings, cb) {		
		if (settings === undefined){
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/adspixels", 
			settings, 
			cb			
		);
	},	
	getCampaignreportlist:function(settings, cb) {		
		if (settings === undefined){
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/me/adaccounts",
			settings, 
			cb
			//"POST"
		);
	},
	searchfblocation: function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}
		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/search", 
			settings, 
			cb
		);
	},
	getfbuserestimate: function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}
		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/reachestimate", 
			settings, 
			cb
			//"POST"
		);
	},
    getfbadspreview: function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}
		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/generatepreviews", 
			settings, 
			cb
			//"POST"
		);
	},
	searchfbtarget:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/targetingsearch", 
			settings, 
			cb
		);
	},

	getfbinstagramaccount:function(settings,pageid, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + pageid + "/instagram_accounts", 
			settings, 
			cb
		);
	},
	
	searchallfbtarget:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/targetingbrowse", 
			settings, 
			cb
		);
	},
	getfbaccount:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/me/accounts", 
			settings, 
			cb
		);
	},
	getfbpageconversition:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/customconversions", 
			settings, 
			cb
			//"POST"
		);
	},
	
	getfbpageapps:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/me/ids_for_business", 
			settings, 
			cb
		);
	},
	getfbpageevents:function(settings, cb){		
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/me/events", 
			settings, 
			cb
		);
	},
	getfbpagepost:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.pageid + "/posts", 
			settings, 
			cb
		);
	},
	getaccountid:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.profileid + "/adaccounts", 
			settings, 
			cb
		);
	},
	updatecampaign:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.campaignid, 
			settings, 
			cb,
			"POST"
		);
	},
	updategroupset:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.groupsetid, 
			settings, 
			cb,
			"POST"
		);
	},
	updateads:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.adsid, 
			settings, 
			cb,
			"POST"
		);
	},
	getthumbinal: function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.videoid + "/thumbnails", 
			settings, 
			cb
		);
	},
	getimagethumbinal: function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.account_id + "/adimages", 
			settings, 
			cb
		);
	},
	addcustomaudience:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/customaudiences",
			settings, 
			cb,
			"POST"
		);
	},
	getcustomaudience:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/customaudiences",
			settings, 
			cb
		);
	},
	adduserscustomaudience:function(settings, cb){
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);			
			return this;
		}		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/" + settings.audienceid + "/users",
			settings, 
			cb,
			"POST"
		);
	},
	editAdCampaign: function(settings, cb)
	{
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			
			return this;
		}
		
		var campaignId = settings.id;
		delete settings.id;
		
		this.makeRequest(
			"/" + campaignId,
			settings,
			cb,
			"POST"
		);
	},
	
	deleteAdCampaign: function(id, cb)
	{
		if (id === undefined)
		{
			cb(new Error("Campaign ID undefined"), null);
		}
		
		this.makeRequest("/" + id, {}, cb, "DELETE");
	},
	
	createAdCreative: function(settings, cb) {
		
		if (settings === undefined)
		{
			cb(new Error("Settings undefined"), null);
			
			return this;
		}
		
		if(typeof(settings.creative) !== "string")
			settings.creative = JSON.stringify(settings.creative);
			
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/adcreatives", 
			settings, 
			cb,
			"POST"
		);
	},
	
	getAdGroup: function(id, cb)
	{
		if (id === undefined)
		{
			cb(new Error("Group ID undefined"), null);
			
			return this;
		}
		
		this.makeRequest("/" + id, {}, cb);
	},
	
	getAdGroups: function(campaign_id, cb) {
		
		if (campaign_id === undefined)
		{
			cb(new Error("Campaign ID undefined"), null);
			
			return this;
		}
		
		var url = "";
		
		if(typeof(campaign_id) === "function")
		{
			url = "/act_" + settings.account_id + "/adgroups";
			cb = campaign_id;
		} else {
			url = "/" + campaign_id  + "/adgroups";
		}
		
		this.makeRequest(
			url, 
			{}, 
			cb
		);
	},
	
	getAdGroupReachEstimate: function(group_id, cb)
	{
		if (group_id === undefined)
		{
			cb(new Error("Group ID undefined"), null);
			
			return this;
		}
		
		this.makeRequest("/" + group_id + "/reachestimate", { currency: "USD" }, cb);
	},
	
	getAdCampaign: function(id, cb)
	{
		if (id === undefined)
		{
			cb(new Error("Campaign ID undefined"), null);
			
			return this;
		}
		
		this.makeRequest(
			'/' + id,
			{},
			cb
		);
	},
	
	getAdCampaigns: function(cb)
	{
		
		this.makeRequest(
			"https://graph.facebook.com/v2.6/act_" + settings.account_id + "/campaigns?access_token="+this.config.accessToken, 
			{}, 
			cb
		);
		
	},
	
	getAdCreatives: function(cb)
	{
		this.makeRequest(
			"/act_" + settings.account_id + "/adcreatives", 
			{}, 
			cb
		);
	},	
	
	getAdsStats: function(objectId, params, cb)
	{
		if (objectId === undefined)
		{
			cb(new Error("Object ID Undefined"), null);
			
			return this;
		}
		
		this.makeRequest(
			"/v2.5/" + objectId + "/insights", 
			params, 
			cb
		);
	},
	
	getAdGroupStats: function(adGroupId, params, cb)
	{
		if (adGroupId === undefined)
		{
			cb(new Error("Ad Group undefined"), null);
			
			return this;
		}
		
		this.getAdsStats(adGroupId, params, cb);
	},
	
	getAdCampaignStats: function(adCampaignId, params, cb)
	{
		
		if (adCampaignId === undefined)
		{
			cb(new Error("Ad Campaign undefined"), null);
			
			return this;
		}
		
		this.getAdsStats(adCampaignId, params, cb);
	},
	
	
	getAdAccountStats: function(adAccountId, cb)
	{
		if(typeof(adAccountId) === "function")
		{
			cb = adAccountId;
			adAccountId = settings.account_id;
		}
			
		this.getAdsStats("act_" + adAccountId, {}, cb);
	},
	
	keywordValid: function(keyword, callback)
	{
		this.makeRequest("/search", {
			type: 'adkeywordvalid',
			keyword_list: keyword
		}, callback);
		
		return this;
	},
	
	makeRequest: function(url, params, callback, method, retry)
	{
		var self 				= this,
			requestArguments 	= arguments,
			retry 				= retry || 0,
			method 				= method || 'GET',             
			params 				= params || {};                
			
		method = method.toUpperCase();
		
		var options = {
			host: 	'graph.facebook.com',
			port: 	443,
			path: 	url,
			method: 'GET'
		};
			
		params.method = method;
		
		//if('accessToken' in this.config)
		//{
			//params.access_token = this.config.accessToken;
		//}
		//params.access_token = this.config.accessToken;
		//console.log(params.access_token);
		options.path += "?" + querystring.stringify(params);
		
		var fulldata = "";
		
		try
		{
		//console.log(options);
		//return false;
			var req = https.request(options, function(res)
			{
				
				res.on('data', function(d)
				{

					fulldata += d;
				});
				
				res.on('end', function()
				{
					try
					{
						var data = JSON.parse(fulldata);                       
                        if ('object' === typeof data){
							if ('error' in data){					
								var errorMessage = "Error from Facebook:\n\tType: " + (data['error']['type'] || "Unknown") + "\n\tMessage: " + (data['error']['message']) + "\n\tCode: " + (data['error']['code']) + "\n\tRequest:\n\t\turl: " + (options['path']) + "\n\t\tmethod: " + (params['method']);								
								
								if (retry < 1)
								{								
									setTimeout(function(){
										self.makeRequest.call(self, url, params, callback, method, retry + 1);
									}, (1 + retry) * 3000);
								}else{
									callback(data['error'], null);
								}
								callback(null,data);
								return null;
							}
						}
					}
					catch (e){
						//couldn't parse a json string...uh oh?
					var errorMessage1 = "Error parsing JSON return value from Facebook:\n\tRequest:\n\t\turl: " + (options['path']) + "\n\t\tmethod: " + (params['method']) + "\n\tResponse:\n\t" + fulldata;
					if (retry < 1){					
							setTimeout(function()
							{
								self.makeRequest.call(self, url, params, callback, method, retry + 1);
							}, (1 + retry) * 3000);
						}else{
							callback(new Error(errorMessage), null);
						}						
						return null;
					}
					callback(null,data);
					return null;
				});
			});
		
			req.end();			
			req.on('error', function(e){
				if (retry < 1){
					setTimeout(function()
					{
						self.makeRequest.call(self, url, params, callback, method, retry + 1);
					}, (1 + retry) * 3000);					
					return self;
				}else{
					var errorMessage2 = 'I failed to succesfully make the following request to facebook after 3 tries:<br>\n' + JSON.stringify(options) + "<br>\n<br>\nReceived the following error:<br>\n" + e;
					
					//LoudDoor.mail('jim@louddoor.com', 'hypemachine@louddoor.com', 'Failed to make FB request', errorMessage);					
					callback(e, null);
					return self;
				}				
			});
		} 
		catch (e){
			cb(e, null);
			return self;
		}		
		return this;
	}	
};
module.exports.FacebookAds = FacebookAds;
