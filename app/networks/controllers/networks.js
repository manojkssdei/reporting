var request = require("request");
var http = require("http");
var qs = require("querystring");
var async = require("async");
var fs = require('fs');
var path = require('path');
var util = require('util');
var archiver = require('archiver');
var Eventbrite = require('eventbrite-node');
var db = require('../../../db.js');
var auth = require('../../../config/auth.js');

/**
Express Controller to getgooglecampaignreports
Created : 2016-05-10
Created By: Regal Singh
Module : getgooglecampaignreports
*/

exports.getgooglecampaignreports = function(req, res, next) {
    var postdata = req.body;

    if (req.configuredetails !== undefined) {
        postdata.useraccountid = req.configuredetails.useraccountid;
        postdata.userrefreshtoken = req.configuredetails.refreshtoken;
        postdata.useraccesstoken = req.configuredetails.accesstoken;
    }

    var reporttype = postdata.reporttype;
    if (reporttype == 'criteria')
        var filepath = googleapiurl + "Reporting/DownloadCriteriaReport_Development.php";
    else
        var filepath = googleapiurl + "Reporting/DownloadCampaignReport_Development.php";

    var campaignrequestObj = JSON.stringify(postdata);
    var campaignoptions = {
        "method": "POST",
        "hostname": googleapihost,
        "port": googleapiport,
        "path": filepath,
        "headers": {
            'content-type': 'application/json',
        }
    };
    var requ = http.request(campaignoptions, function(resp) {
        var chunks = [];
        resp.on("data", function(chunk) {
            chunks.push(chunk);
        });
        resp.on("end", function() {
            var body = Buffer.concat(chunks);
            var googlecampaign = JSON.parse(body.toString());
            if (googlecampaign.reportid !== undefined && googlecampaign.reportid == 0) {
                res.send({ 'result': googlecampaign, 'code': 100 });
            } else {
                var googlecampaigndata = {};
                googlecampaigndata.data = googlecampaign;
                if (googlecampaign.campaignid == 1)
                    googlecampaigndata.code = 100;
                else
                    googlecampaigndata.code = 200;
                if (postdata.reportsaved !== undefined && postdata.reportsaved == 'yes') {
                    req.reports = googlecampaigndata.data;
                    req.reports.reporttype = 'criteria';
                    next();
                } else {
                    res.send({ 'result': { 'data': googlecampaigndata.data }, 'code': googlecampaigndata.code });
                }
            }
        });
    });
    requ.write(campaignrequestObj)
    requ.end();
}

/**
Express Controller to Add Facebook Campaign
Created : 2016-06-28
Created By: Lavlesh Mishra
Module : Get Report of campaign
*/
exports.addcampaignreportlist = function(req, res) {
    var fields = ["campaign_id", "campaign_name", "account_id", "objective", "cpm", "cpc", "impressions", "spend", "ctr", "adset_name", "ad_id", "ad_name", "clicks", "cost_per_total_action", "inline_post_engagement"];

    if (req.configuredetails.accesstoken != "") {
        var setaccesstoken = req.configuredetails.accesstoken; }
    if (req.configuredetails.useraccountid != "") {
        var useraccountid = req.configuredetails.useraccountid; }
    fb.getreportCampaign({
        fields: JSON.stringify(fields),
        date_preset: 'yesterday',
        level: 'ad',
        access_token: setaccesstoken,
        account_id: useraccountid
    }, function(error, response) {
        if (response.data.length > 0) {
            var connection = db.connection();
            for (var i = 0; i < response.data.length; i = i + 1) {
                var savedata = response.data[i];
                var query = "INSERT INTO `facebook_campaignreport` SET ";
                query = query + "  `id` = NULL";
                query = query + ", `campaign_id` = '" + savedata.campaign_id + "'";
                query = query + ", `network_id` = 1";
                query = query + ", `campaign_name` = '" + savedata.campaign_name + "'";
                query = query + ", `account_id` = '" + savedata.account_id + "'";
                query = query + ", `objective` = '" + savedata.objective + "'";
                query = query + ", `cpm` = '" + savedata.cpm + "'";
                query = query + ", `cpc` = '" + savedata.cpc + "'";
                query = query + ", `impressions` = '" + savedata.impressions + "'";
                query = query + ", `spend` = '" + savedata.spend + "'";
                query = query + ", `ctr` = '" + savedata.ctr + "'";
                query = query + ", `group_name` = '" + savedata.adset_name + "'";
                query = query + ", `ad_id` = '" + savedata.ad_id + "'";
                query = query + ", `ad_name` = '" + savedata.ad_name + "'";
                query = query + ", `clicks` = '" + savedata.clicks + "'";
                query = query + ", `cost_per_total_action` = '" + savedata.cost_per_total_action + "'";
                query = query + ", `inline_post_engagement` = '" + savedata.inline_post_engagement + "'";
                query = query + ", `date_start` = '" + savedata.date_start + "'";
                query = query + ", `date_stop` = '" + savedata.date_stop + "'";
                query = query + ", `createddate` = '" + savedata.date_start + "'";
                connection.query(query, function(err7, results) {
                    if (err7) { console.log('error'); } else { console.log('success'); }
                    connection.end();
                });
            }
        } else {
            res.json({ result: response, code: 200 });
            connection.end();
        }

    });
}

/**
Express Controller to getcampaignreportlist
Created : 2016-05-10
Created By: Regal Singh
Module : getcampaignreportlist
*/

exports.getcampaignreportlist = function(req, res) {
    var connection = db.connection();
    var request = req.body;

    //var conquery = 'SELECT campaign_id,campaign_name,account_id,objective,ROUND(SUM(cpm),2) as cpmtotal,ROUND(SUM(cpc),2) as cpctotal,SUM(impressions) as impressionstotal,ROUND(SUM(spend),2) as spendtotal,ROUND(SUM(ctr),2) as ctrtotal,group_name,ad_id,ad_name,ROUND(SUM(clicks),2) as clickstotal,ROUND(SUM(cost_per_total_action),2) as totalaction,ROUND(SUM(inline_post_engagement),2) as postengagement,date_start,date_stop FROM `campaignreports` WHERE `account_id` in ('+request.account_id+ ') and `network_id` in ('+request.network_id+ ')'; 

    var conquery = 'SELECT campaign_id,campaignreports.network_id,campaign_name,account_id,objective,ROUND(SUM(cpm),2) as cpmtotal,ROUND(SUM(cpc),2) as cpctotal,SUM(impressions) as impressionstotal,ROUND(SUM(spend),2) as spendtotal,ROUND(SUM(ctr),2) as ctrtotal,group_name,ad_id,ad_name,ROUND(SUM(clicks),2) as clickstotal,ROUND(SUM(cost_per_total_action),2) as totalaction,ROUND(SUM(inline_post_engagement),2) as postengagement,date_start,date_stop FROM `campaignreports` ';

    conquery = conquery + ' WHERE campaignreports.`network_id` in (' + request.network_id + ')';

    if (request.objectivename != "" && request.objectivename != undefined) {
        conquery = conquery + " and objective = '" + request.objectivename + "'";
    }
    if (request.campaignname != "" && request.campaignname != undefined) {
        conquery = conquery + " and campaign_name = '" + request.campaignname + "'";
    }
    if (request.groupname != "" && request.groupname != undefined) {
        conquery = conquery + " and group_name = '" + request.groupname + "'";
    }
    conquery = conquery + ' and createddate between ' + '"' + request.start_date + '"' + ' AND ' + '"' + request.end_date + '"' + ' group by campaign_id';
    connection.query(conquery, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
            connection.end();
        } else {
            res.json({ result: results, code: 200 });
            connection.end();
        }
    });
}

/**
Express Controller to reportdetails
Created : 2016-05-10
Created By: Regal Singh
Module : reportdetails
*/

exports.reportdetails = function(req, res, next) {
    var request = req.body;
    var connection = db.connection();
    var datearray = request.graphdate;
    getreports(datearray, request, function(response) {
        res.json({ result: response, code: 200 });
    });
}

/**
Express Controller to getreports
Created : 2016-05-10
Created By: Regal Singh
Module : getreports
*/

function getreports(datearray, requestval, cb) {
    var connection = db.connection();
    var returnvalues = [];
    var pending = datearray.length;
    for (var i in datearray) {
        var conquery = " SELECT ROUND(SUM(cpm),2) as cpmtotal,ROUND(SUM(cpc),2) as cpctotal,SUM(impressions) as impressionstotal,ROUND(SUM(spend),2) as spendtotal,ROUND(SUM(clicks),2) as clickstotal";
        //conquery = conquery + "";

        conquery = conquery + " FROM `campaignreports` where `network_id` in (" + requestval.network_id + ") and createddate between '" + datearray[i].start_date + "' and '" + datearray[i].end_date + "'";

        if (requestval.objectivename != "" && requestval.objectivename != undefined) {
            conquery = conquery + " and objective = '" + requestval.objectivename + "'";
        }
        if (requestval.campaignname != "" && requestval.campaignname != undefined) {
            conquery = conquery + " and campaign_name = '" + requestval.campaignname + "'";
        }
        if (requestval.groupname != "" && requestval.groupname != undefined) {
            conquery = conquery + " and group_name = '" + requestval.groupname + "'";
        }
        if (conquery != "") {
            connection.query(conquery, function(err, results) {
                if (results[0] != undefined)
                    returnvalues.push(results[0]);
                if (0 === --pending) {
                    cb(returnvalues); //callback if all queries are processed
                    connection.end();
                }
            });
        }
    }
}

/**
Express Controller to callapiforcampaignreport
Created : 2016-05-10
Created By: Regal Singh
Module : callapiforcampaignreport
*/

exports.callapiforcampaignreport = function(req, res, next) {
    var connection = db.connection();
    req.body.reporttype = 'campaign';
    req.body.googledateRangeType = 'YESTERDAY';
    req.body.reportsaved = 'yes';
    var conquery = 'SELECT campaigns.user_id from campaigns';
    conquery = conquery + ' where campaigns.googlecampaignid != "" and campaigns.googlecampaignid is not null';
    conquery = conquery + ' group by campaigns.user_id desc';
    connection.query(conquery, function(err, results) {
        if (err) {
            res.json({ error: err, code: 101 });
        } else {
            if (results && results[0] !== undefined) {
                var userdata = results[0];
                req.body.userid = userdata;
                next();
            }
        }
    });
    connection.end();
}

/**
Express Controller to savereportinfo
Created : 2016-05-10
Created By: Regal Singh
Module : savereportinfo
*/

exports.savereportinfo = function(req, res, next) {
    var reportdata = req.reports;
    if (reportdata.reporttype == 'criteria') {
        savingcampaigneports(reportdata, function(response) {
            res.send('record has been saved');
        });
    } else {
        console.log(reportdata);
    }
}

/**
Express Controller to savingcampaigneports
Created : 2016-05-10
Created By: Regal Singh
Module : savingcampaigneports
*/

function savingcampaigneports(reportsdata, cb) {
    var connection = db.connection();
    var returnvalues = [];
    var pending = reportsdata.length;
    for (var i in reportsdata) {
        savedata = reportsdata[i];

        if (savedata.id != undefined) {
            var query = "Insert into `campaignreports` SET ";

            query = query + " `campaign_id` = '" + savedata.id + "'";

            query = query + ", `network_id` = '2'";
            query = query + ", `campaign_name` = '" + savedata.name + "'";
            query = query + ", `account_id` = ''";
            query = query + ", `objective` = '" + savedata.AdvertisingChannel + "'";
            query = query + ", `group_name` = '" + savedata.groupname + "'";
            query = query + ", `cpm` = '" + savedata.AvgCPM + "'";
            query = query + ", `cpc` = '" + savedata.AvgCPC + "'";
            query = query + ", `impressions` = '" + savedata.Impressions + "'";
            query = query + ", `spend` = '" + savedata.Cost + "'";
            query = query + ", `ctr` = '" + savedata.CTR + "'";
            query = query + ", `clicks` = '" + savedata.Clicks + "'";
            query = query + ", `date_start` = '" + savedata.Startdate + "'";
            query = query + ", `date_stop` = '" + savedata.Enddate + "'";
            query = query + ", `createddate` = '" + savedata.reportdate + "'";

            if (query != "") {
                connection.query(query, function(err7, results) {
                    if (!err7) returnvalues.push(results);
                    if (0 === --pending) {
                        cb(returnvalues); //callback if all queries are processed
                        connection.end();
                    }
                });
            }
        }
    }
    connection.end();
}

/**
Express Controller to callapiforcriteriareport
Created : 2016-05-10
Created By: Regal Singh
Module : callapiforcriteriareport
*/

exports.callapiforcriteriareport = function(req, res, next) {
    req.body.reporttype = 'criteria';
    next();
}

function yesterdaydate() {
    var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    var diff = todayTimeStamp - oneDayTimeStamp;
    var yesterdayDate = new Date(diff);
    var yesterdayString = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();
    return yesterdayString;
}

/**
Express Controller to getfacebookcampaignreports
Created : 2016-05-10
Created By: Regal Singh
Module : getfacebookcampaignreports
*/

exports.getfacebookcampaignreports = function(req, res) {
    var fields = ["campaign_id", "campaign_name", "account_id", "objective", "cpm", "cpc", "impressions", "spend", "ctr", "adset_name", "ad_id", "ad_name", "clicks", "cost_per_total_action", "inline_post_engagement"];
    if (req.body.breakdown == '0') {
        var breakdown = ['age', 'gender'];
    } else {
        var breakdown = [req.body.breakdown];
    }

    if (req.configuredetails.accesstoken != "") {
        var setaccesstoken = req.configuredetails.accesstoken; }
    if (req.configuredetails.useraccountid != "") {
        var useraccountid = req.configuredetails.useraccountid; }

    if (req.body.facebookdateRangeType == 'custom') {
        var time_range = { "since": req.body.startdatereports, "until": req.body.enddatereports };
        fb.getreportCampaignlevel({
            campaignid: req.body.campaignid,
            fields: JSON.stringify(fields),
            breakdowns: JSON.stringify(breakdown),
            time_range: JSON.stringify(time_range),
            access_token: setaccesstoken,
            account_id: useraccountid
        }, function(error, response) {
            res.json({ result: response, code: 200 });
        });
    } else {
        fb.getreportCampaignlevel({
            campaignid: req.body.campaignid,
            fields: JSON.stringify(fields),
            breakdowns: JSON.stringify(breakdown),
            date_preset: req.body.facebookdateRangeType,
            access_token: setaccesstoken,
            account_id: useraccountid
        }, function(error, response) {
            res.json({ result: response, code: 200 });
        });
    }
}

/**
Express Controller to getgooglecampaignreportsdetails
Created : 2016-05-10
Created By: Regal Singh
Module : getgooglecampaignreportsdetails
*/

exports.getgooglecampaignreportsdetails = function(req, res) {
    var connection = db.connection();
    var googlecampaignid = req.body.campid;

    conquery = conquery + ' order by campaigns.id desc';

    if (googlecampaignid != undefined) {
        var conquery = 'SELECT campaigns.title,campaigns.groupname,campaign_adstypes.adstitle,campaign_schedulings.start_date,campaign_schedulings.end_date from campaigns';
        conquery = conquery + ' inner join campaign_schedulings on campaign_schedulings.campaign_id = campaigns.id';
        conquery = conquery + ' inner join campaign_adstypes on campaign_adstypes.campaign_id = campaigns.id';
        conquery = conquery + ' where campaigns.network_id = 2';
        conquery = conquery + ' and campaigns.googlecampaignid = ' + googlecampaignid;
        conquery = conquery + ' order by campaigns.id desc';

        connection.query(conquery, function(err, results) {
            if (err) {
                res.json({ error: err, code: 101 });
                connection.end();
            } else {
                res.json({ result: results, code: 200 });
                connection.end();
            }
        });
    }
}

/**
Express Controller to configureaccounts
Created : 2016-05-10
Created By: Regal Singh
Module : configureaccounts
*/

exports.configureaccounts = function(req, res) {
    var connection = db.connection();
    var userid = req.params.userid;
    if (userid != undefined) {
        var query = 'SELECT * FROM configureaccounts  WHERE user_id =' + userid;
        connection.query(query, function(err, results) {
            if (err) {
                res.json({ error: err, code: 101 });
                connection.end();
            } else {
                req.session.param_userid = userid;
                res.json({ result: results, code: 200 });
                connection.end();
            }
        });
    }
}

/**
Express Controller to setconfigureaccounts
Created : 2016-05-10
Created By: Regal Singh
Module : setconfigureaccounts
*/

exports.setconfigureaccounts = function(req, res, next) {
    if (req.session.useraccountid !== undefined && req.body.apicall != "update") {
        req.configuredetails = {};
        req.configuredetails.useraccountid = req.session.useraccountid;
        req.configuredetails.refreshtoken = req.session.refreshtoken;
        req.configuredetails.accesstoken = req.session.accesstoken;
        next();
    } else {
        var connection = db.connection();
        var userid = req.body.user_id;
        var network_id = req.body.network_id;
        var configureaccountid = req.body.configureaccountid;
        req.session.param_userid = userid;

        if (configureaccountid !== undefined) {
            var query = 'SELECT useraccountid,refreshtoken,accesstoken FROM configureaccounts  WHERE profile_id =' + configureaccountid;
        } else if (userid != undefined && network_id !== undefined) {
            var query = 'SELECT useraccountid,refreshtoken,accesstoken FROM configureaccounts  WHERE status = 1 and is_set = 1 and user_id =' + userid + ' and network_id =' + network_id;
        }
        console.log('query ', query);
        if (query !== '' && query !== undefined) {
            connection.query(query, function(err, results) {
                if (err) {
                    req.configuredetails = {};
                } else {
                    if (results[0] !== undefined) {
                        req.configuredetails = results[0];
                        req.session.useraccountid = req.configuredetails.useraccountid;
                        req.session.refreshtoken = req.configuredetails.refreshtoken;
                        req.session.accesstoken = req.configuredetails.accesstoken;
                    } else {
                        req.configuredetails = {};
                        req.session.useraccountid = '';
                        req.session.refreshtoken = '';
                        req.session.accesstoken = '';
                    }
                }
                connection.end();
                next();
            });
        } else {
            next();
        }
    }
}

/**
Express Controller to configureaccounts
Created : 2016-05-10
Created By: Regal Singh
Module : configureaccounts
*/

exports.getassociatedaccount = function(req, res) {
    var connection = db.connection();
    var userid = req.body.user_id;
    var network_id = req.body.network_id;
    if (userid != undefined) {
        var query = 'SELECT  username,profile_id FROM configureaccounts  WHERE user_id =' + userid + ' and network_id=' + network_id;
        connection.query(query, function(err, results) {
            if (err) {
                res.json({ error: err, code: 101 });
                connection.end();
            } else {
                req.session.param_userid = userid;
                res.json({ result: results, code: 200 });
                connection.end();
            }
        });
    }
}

/*get eventbrite code at step 1 */
exports.geteventbritetoken = function(req, res) {
    var eventbriteObj = new Eventbrite(auth.eventbrite.clientID, auth.eventbrite.clientSecret);
    var authUrl = eventbriteObj.getOAuthUrl();
    res.redirect(authUrl);
}

/*generate eventbrite token at step 2 */
exports.geteventbritetokenstep2 = function(req, res) {
    var userid = req.session.param_userid;
    var eventbriteObj = new Eventbrite(auth.eventbrite.clientID, auth.eventbrite.clientSecret);
    var code = req.query.code;
    var eventbriteError = req.query.error;

    if (eventbriteError && eventbriteError != undefined) {
        var eventbritedata = {};
        eventbritedata.user_id = userid;
        eventbritedata.network_id = 3;
        eventbritedata.status = 0;
        saveeventbritetoken(eventbritedata);
        res.json({ error: eventbriteError, code: 101 });
    }
    if (code != undefined) {
        eventbriteObj.authorize(code, function(err, response) {
            if (err) {
                res.json({ error: err, code: 101 });
            }
            var access_token = response.access_token;
            if (access_token != undefined) {
                var eventbritedata = {};
                eventbritedata.code = code;
                eventbritedata.user_id = userid;
                eventbritedata.access_token = access_token;
                eventbritedata.network_id = 3;
                eventbritedata.status = 1;
                saveeventbritetoken(eventbritedata);
                res.json({ result: eventbritedata, code: 200 });
                //res.redirect('http://localhost:5504/#/configureaccount');
            }
        });
    }
}

/* save accesstoken into database */
function saveeventbritetoken(eventbritedata) {
    var connection = db.connection();
    var query = 'SELECT id FROM `configureaccounts` WHERE `user_id` = ' + '"' + eventbritedata.user_id + '" AND `network_id` = ' + '"' + eventbritedata.network_id + '" ';

    if (query != "") {
        connection.query(query, function(err7, result) {
            if (err7) {
                console.log(err7);
            } else
            if (result.length == 0) {
                var query = "INSERT INTO `configureaccounts` SET ";
                query = query + " `id` = NULL ,";
                query = query + " `network_id` = '" + eventbritedata.network_id + "'";
                query = query + ", `created` = '" + formatDate() + "'";
            } else {
                var query = "UPDATE `configureaccounts` SET ";
                query = query + " `network_id` = '" + eventbritedata.network_id + "'";
            }

            if (eventbritedata.access_token != undefined)
                query = query + ", `accesstoken` = '" + eventbritedata.access_token + "'";

            if (eventbritedata.profile_id != undefined)
                query = query + ", `profile_id` = '" + eventbritedata.profile_id + "'";

            if (eventbritedata.refreshtoken != undefined)
                query = query + ", `refreshtoken` = '" + eventbritedata.refreshtoken + "'";

            if (eventbritedata.useraccountid != undefined)
                query = query + ", `useraccountid` = '" + eventbritedata.useraccountid + "'";

            if (eventbritedata.status != undefined)
                query = query + ", `status` = '" + eventbritedata.status + "'";

            if (eventbritedata.username != undefined)
                query = query + ", `username` = '" + eventbritedata.username + "'";

            query = query + ", `modified` = '" + formatDate() + "'";
            query = query + ", `is_set` = 1";

            if (result.length == 0) {
                query = query + ", `user_id` = '" + eventbritedata.user_id + "'  ";
            } else {
                query = query + " WHERE `user_id` = '" + eventbritedata.user_id + "' and `network_id` = '" + eventbritedata.network_id + "'";
            }

            if (query != "") {
                console.log('query', query);
                connection.query(query, function(err, results) {
                    if (err) {
                        return err;
                        res.json({ error: err, code: 101 });
                        connection.end();
                    }
                    connection.end();
                });
            }
        });
    }
}

function formatDate(convertdate) {
    if (convertdate != '' && convertdate != undefined)
        var today = new Date(convertdate);
    else
        var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var strTime = hours + ':' + minutes + ':' + seconds;
    var month = +today.getMonth() + +1;
    if (convertdate != '' && convertdate != undefined)
        return today.getFullYear() + "-" + month + "-" + today.getDate();
    else
        return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
}

function toJSON(str) {
    var json;
    try {
        json = JSON.parse(str);
    } catch (e) {
        json = str;
    }
    return json;
}

/*get eventbrite profile information*/
exports.geteventbritemyprofile = function(req, res) {
    var data = {};
    data.token = req.session.accesstoken;
    data.url = 'users/me';
    request.get({
        headers: { Authorization: 'Bearer ' + data.token },
        url: auth.eventbrite.apiURL + data.url,
    }, function(error, response, body) {
        if (error) {
            console.log('error ', error);
            var jsonData = toJSON(body);
            console.log('jsonData', jsonData);
        }
        if (body) {
            var jsonData = toJSON(body);
            var eventbritedata = {};
            eventbritedata.profile_id = jsonData.id;
            eventbritedata.user_id = req.session.param_userid;
            eventbritedata.network_id = '3';
            saveeventbritetoken(eventbritedata);
            res.json({ result: eventbritedata, code: 200 });
        }
    });

}

/*get all eventbrite own events*/
exports.geteventbriteownedevents = function(req, res) {
    var userid = req.session.param_userid;
    var data = {};
    data.token = req.session.accesstoken;
    data.url = 'users/me/owned_events/';
    request.get({
        headers: { Authorization: 'Bearer ' + data.token },
        url: auth.eventbrite.apiURL + data.url,
    }, function(error, response, body) {
        if (error) {
            console.log('error ', error);
        }
        if (body) {
            var jsonData = toJSON(body);
            saveeventbriteownedevents(jsonData, userid);
            res.json({ result: body, code: 200 });
        }
    });

}

/* save accesstoken into database */
function saveeventbriteownedevents(eventbritedata, userid) {
    var connection = db.connection();
    var object_count = eventbritedata.pagination.object_count;
    if (object_count > 0) {
        for (var i = 0; i < object_count; i++) {
            var select_query = 'SELECT id,changed FROM `eventbrite_events` WHERE `eventbrite_id` = ' + '"' + eventbritedata.events[i].id + '"';

            (function() {
                var counterCopy = i;
                var savedata = eventbritedata.events[i];
                connection.query(select_query, function(select_error, select_result, field) {

                    if (select_error) {
                        res.json({ error: select_error, code: 101 });
                    }

                    if (select_result.length == 0) {
                        var query = "INSERT INTO `eventbrite_events` SET `id` = NULL , ";
                    } else if (select_result.length == 1) {
                        if (select_result[0].changed != savedata.changed)
                            var query = "UPDATE `eventbrite_events` SET ";
                    }

                    query = query + "  `name_as_text` = '" + savedata.name.text + "'";
                    query = query + ", `name_as_html` = '" + savedata.name.html + "'";
                    query = query + ", `description_as_text` = '" + savedata.description.text + "'";
                    query = query + ", `description_as_html` = '" + savedata.description.html + "'";
                    query = query + ", `eventbrite_id` = '" + savedata.id + "'";
                    query = query + ", `url` = '" + savedata.url + "'";
                    query = query + ", `start_timezone` = '" + savedata.start.timezone + "'";
                    query = query + ", `start_local` = '" + savedata.start.local + "'";
                    query = query + ", `start_utc` = '" + savedata.start.utc + "'";
                    query = query + ", `end_timezone` = '" + savedata.end.timezone + "'";
                    query = query + ", `end_local` = '" + savedata.end.local + "'";
                    query = query + ", `end_utc` = '" + savedata.end.utc + "'";
                    query = query + ", `created` = '" + savedata.created + "'";
                    query = query + ", `changed` = '" + savedata.changed + "'";
                    query = query + ", `capacity` = '" + savedata.capacity + "'";
                    query = query + ", `status` = '" + savedata.status + "'";
                    query = query + ", `currency` = '" + savedata.currency + "'";
                    query = query + ", `listed` = '" + savedata.listed + "'";
                    query = query + ", `shareable` = '" + savedata.shareable + "'";
                    query = query + ", `invite_only` = '" + savedata.invite_only + "'";
                    query = query + ", `online_event` = '" + savedata.online_event + "'";
                    query = query + ", `show_remaining` = '" + savedata.show_remaining + "'";
                    query = query + ", `tx_time_limit` = '" + savedata.tx_time_limit + "'";
                    query = query + ", `hide_start_date` = '" + savedata.hide_start_date + "'";
                    query = query + ", `hide_end_date` = '" + savedata.hide_end_date + "'";
                    query = query + ", `locale` = '" + savedata.locale + "'";
                    query = query + ", `is_locked` = '" + savedata.is_locked + "'";
                    query = query + ", `privacy_setting` = '" + savedata.privacy_setting + "'";
                    query = query + ", `is_series` = '" + savedata.is_series + "'";
                    query = query + ", `is_series_parent` = '" + savedata.is_series_parent + "'";
                    query = query + ", `is_reserved_seating` = '" + savedata.is_reserved_seating + "'";
                    query = query + ", `logo_id` = '" + savedata.logo_id + "'";
                    query = query + ", `organizer_id` = '" + savedata.organizer_id + "'";
                    query = query + ", `venue_id` = '" + savedata.venue_id + "'";
                    query = query + ", `category_id` = '" + savedata.category_id + "'";
                    query = query + ", `subcategory_id` = '" + savedata.subcategory_id + "'";
                    query = query + ", `format_id` = '" + savedata.format_id + "'";
                    query = query + ", `resource_uri` = '" + savedata.resource_uri + "'";
                    query = query + ", `logo_url` = '" + savedata.logo.url + "'";
                    query = query + ", `logo_aspect_ratio` = '" + savedata.logo.aspect_ratio + "'";
                    query = query + ", `logo_edge_color` = '" + savedata.logo.edge_color + "'";
                    query = query + ", `logo_edge_color_set` = '" + savedata.logo.edge_color_set + "'";

                    if (select_result.length == 0) {
                        query = query + ", `user_id` = '" + userid + "'";
                    } else if (select_result.length > 0) {
                        if (select_result[0].changed != savedata.changed)
                            query = query + " WHERE `eventbrite_id` = '" + savedata.id + "' and `user_id` = '" + userid + "' ";

                        if (select_result[0].changed == savedata.changed)
                            var query = "";
                    }

                    if (query != "") {
                        connection.query(query, function(err, results, field) {
                            if (err) {
                                res.json({ error: err, code: 101 });
                            }

                            if (counterCopy == (object_count - 1)) {
                                connection.end();
                            }

                        });
                    }
                });

            }());
        }
    }
}

/*get all eventbrite own events*/
exports.geteventbriteorganizers = function(req, res) {
    var userid = req.session.param_userid;
    var connection = db.connection();
    var query = 'SELECT DISTINCT organizer_id FROM `eventbrite_events` WHERE `user_id` = ' + '"' + userid + '"';

    connection.query(query, function(select_error, select_result) {
        if (select_error) {
            res.json({ error: select_error, code: 101 });
        }

        var total_organizers = select_result.length;
        if (total_organizers > 0) {
            for (var i = 0; i < total_organizers; i++) {
                (function() {

                    var counterCopy = i;
                    var organizer_id = select_result[i].organizer_id;
                    var data = {};
                    data.token = req.session.accesstoken;
                    data.url = 'organizers/' + organizer_id;
                    request.get({
                        headers: { Authorization: 'Bearer ' + data.token },
                        url: auth.eventbrite.apiURL + data.url,
                    }, function(error, response, body) {
                        if (error) {
                            console.log('error ', error);
                        }
                        if (body) {
                            var eventbritedata = toJSON(body);
                            var select_query = 'SELECT id FROM `eventbrite_organizers` WHERE `organizer_id` = ' + '"' + eventbritedata.id + '"';

                            connection.query(select_query, function(select_error, select_result) {
                                if (select_error) {
                                    res.json({ error: select_error, code: 101 });
                                }

                                if (select_result.length == 0)
                                    var query = "INSERT INTO `eventbrite_organizers` SET `id` = NULL , ";
                                else
                                    var query = "UPDATE `eventbrite_organizers` SET ";

                                query = query + " `name` = '" + eventbritedata.name + "'";
                                query = query + ", `description_as_text` = '" + eventbritedata.description.text + "'";
                                query = query + ", `description_as_html` = '" + eventbritedata.description.html + "'";
                                query = query + ", `long_description_as_text` = '" + eventbritedata.long_description.text + "'";
                                query = query + ", `long_description_as_html` = '" + eventbritedata.long_description.html + "'";
                                query = query + ", `logo` = '" + eventbritedata.logo + "'";
                                query = query + ", `resource_uri` = '" + eventbritedata.resource_uri + "'";
                                query = query + ", `organizer_id` = '" + eventbritedata.id + "'";
                                query = query + ", `url` = '" + eventbritedata.url + "'";
                                query = query + ", `logo_id` = '" + eventbritedata.logo_id + "'";

                                if (select_result.length == 0)
                                    query = query + ", `user_id` = '" + userid + "'";
                                else
                                    query = query + " WHERE `organizer_id` = '" + eventbritedata.id + "' and `user_id` = '" + userid + "'";

                                connection.query(query, function(err, results) {
                                    if (err) {
                                        res.json({ error: err, code: 101 });
                                    }
                                    if (counterCopy == (total_organizers - 1)) {
                                        res.json({ result: 'success', code: 200 });
                                        connection.end();
                                    }
                                });

                            });
                        }
                    });

                }());
            }
        }
    });
}

/*get all eventbrite venues*/
exports.geteventbritevenues = function(req, res) {
    var userid = req.session.param_userid;
    var connection = db.connection();
    var query = 'SELECT DISTINCT venue_id FROM `eventbrite_events` WHERE `user_id` = ' + '"' + userid + '" and `venue_id` != "0" ';

    connection.query(query, function(select_error, select_result) {
        if (select_error) {
            res.json({ error: select_error, code: 101 });
        }
        var total_venues = select_result.length;
        if (select_result.length > 0) {

            for (var i = 0; i < total_venues; i++) {
                (function() {
                    var counterCopy = i;
                    var venue_id = select_result[i].venue_id;
                    var data = {};
                    data.token = req.session.accesstoken;
                    data.url = 'venues/' + venue_id;
                    console.log('auth.eventbrite.apiURL + data.url' , auth.eventbrite.apiURL + data.url , 'data.token' ,data.token );
                    request.get({
                        headers: { Authorization: 'Bearer ' + data.token },
                        url: auth.eventbrite.apiURL + data.url,
                    }, function(error, response, body) {
                        if (error) {
                            res.json({ error: error, code: 101 });
                        }
                        if (body) {
                            var eventbritedata = toJSON(body);
                            console.log(eventbritedata);
                            var select_query = 'SELECT id FROM `eventbrite_venues` WHERE `venue_id` = ' + '"' + eventbritedata.id + '"';

                            connection.query(select_query, function(select_error, select_result) {
                                if (select_error) {
                                    res.json({ error: select_error, code: 101 });
                                }

                                if (select_result.length == 0)
                                    var query = "INSERT INTO `eventbrite_venues` SET `id` = NULL , ";
                                else
                                    var query = "UPDATE `eventbrite_venues` SET ";

                                query = query + "  `name` = '" + eventbritedata.name + "'";
                                query = query + ", `venue_id` = '" + eventbritedata.id + "'";
                                query = query + ", `address_1` = '" + eventbritedata.address.address_1 + "'";
                                query = query + ", `address_2` = '" + eventbritedata.address.address_2 + "'";
                                query = query + ", `city` = '" + eventbritedata.address.city + "'";
                                query = query + ", `region` = '" + eventbritedata.address.region + "'";
                                query = query + ", `postal_code` = '" + eventbritedata.address.postal_code + "'";
                                query = query + ", `country` = '" + eventbritedata.address.country + "'";
                                query = query + ", `latitude` = '" + eventbritedata.address.latitude + "'";
                                query = query + ", `longitude` = '" + eventbritedata.address.longitude + "'";
                                query = query + ", `localized_address_display` = '" + eventbritedata.address.localized_address_display + "'";
                                query = query + ", `localized_area_display` = '" + eventbritedata.address.localized_area_display + "'";

                                if (select_result.length == 0)
                                    query = query + ", `user_id` = '" + userid + "'";
                                else
                                    query = query + " WHERE `venue_id` = '" + eventbritedata.id + "' and `user_id` = '" + userid + "'";

                                if (query != "") {
                                    connection.query(query, function(err, results) {
                                        console.log( '------------ query -------------');
                                        console.log(query);
                                        if (err) {
                                            res.json({ error: err, code: 101 });
                                        }

                                        if (counterCopy == (total_venues - 1)) {
                                            res.json({ result: 'success', code: 200 });
                                            connection.end();
                                        }
                                    });
                                }
                            });
                        }
                    });

                }());
            }
        }
    });
}


/*get all eventbrite categories*/
exports.geteventbritecategories = function(req, res) {
    var data = {};
    data.token = req.session.accesstoken;
    data.url = 'categories/';
    request.get({
        headers: { Authorization: 'Bearer ' + data.token },
        url: auth.eventbrite.apiURL + data.url,
    }, function(error, response, body) {
        if (error) {
            console.log('error ', error);
        }
        if (body) {
            var jsonData = toJSON(body);
            console.log('---------------saveeventbritecategories-----------' , jsonData);
            saveeventbritecategories(jsonData);
            res.json({ result: body, code: 200 });
        }
    });
}

/* save accesstoken into database */
function saveeventbritecategories(eventbritedata, userid) {
    var connection = db.connection();
    var object_count = eventbritedata.pagination.object_count;
    if (object_count > 0) {
        for (var i = 0; i < object_count; i++) {
            var select_query = 'SELECT id FROM `eventbrite_categories` WHERE `category_id` = ' + '"' + eventbritedata.categories[i].id + '"';

            (function() {
                var counterCopy = i;
                var savedata = eventbritedata.categories[i];
                connection.query(select_query, function(select_error, select_result, field) {

                    if (select_error) {
                        res.json({ error: select_error, code: 101 });
                    }

                    if (select_result.length == 0) {
                        var query = "INSERT INTO `eventbrite_categories` SET `id` = NULL , ";
                    } else if (select_result.length > 0) {
                            var query = "UPDATE `eventbrite_categories` SET ";
                    }

                    query = query + "  `name` = '" + savedata.name + "'";
                    query = query + ", `category_id` = '" + savedata.id + "'";
                    query = query + ", `name_localized` = '" + savedata.name_localized + "'";
                    query = query + ", `short_name` = '" + savedata.short_name + "'";
                    query = query + ", `short_name_localized` = '" + savedata.short_name_localized + "'";
           
                     if (select_result.length > 0) 
                            query = query + " WHERE `category_id` = '" + savedata.id + "'";
                    
                    connection.query(query, function(err, results, field) {
                        if (err) {
                            res.json({ error: err, code: 101 });
                        }

                        if (counterCopy == (object_count - 1)) {
                            connection.end();
                        }
                    });
                });

            }());
        }
    }
}



/*get all eventbrite categories*/
exports.geteventbritesubcategories = function(req, res) {
    var data = {};
    data.token = req.session.accesstoken;
    data.url = 'subcategories/';


    while (i < auth.eventbrite.defaultPageCount) {
            request.get({
                headers: { Authorization: 'Bearer ' + data.token },
                url: auth.eventbrite.apiURL + data.url,
            }, function(error, response, body) {
                if (error) {
                    console.log('error ', error);
                }
                if (body) {
                    var jsonData = toJSON(body);
                    saveeventbritesubcategories(jsonData);
                    res.json({ result: body, code: 200 });
                }
            });
        i++;
    }
   
}

/* save accesstoken into database */
function saveeventbritesubcategories(eventbritedata) {
    var connection = db.connection();
    var object_count = eventbritedata.pagination.object_count;
    if (object_count > 0) {
        for (var i = 0; i < object_count; i++) {
            var select_query = 'SELECT id FROM `eventbrite_sub_categories` WHERE `sub_category_id` = ' + '"' + eventbritedata.subcategories[i].id + '"';
            
            (function() {
                var counterCopy = i;
                var savedata = eventbritedata.subcategories[i];
                connection.query(select_query, function(select_error, select_result, field) {

                    if (select_error) {
                        return;
                        //res.json({ error: select_error, code: 101 });
                    }

                    if (select_result.length == 0) {
                        var query = "INSERT INTO `eventbrite_sub_categories` SET `id` = NULL , ";
                    } else if (select_result.length > 0) {
                            var query = "UPDATE `eventbrite_sub_categories` SET ";
                    }

                    query = query + "  `name` = '" + savedata.name + "'";
                    query = query + ", `parent_category_id` = '" + savedata.parent_category.id + "'";
                    query = query + ", `sub_category_id` = '" + savedata.id + "'";
           
                    if (select_result.length > 0) {
                            query = query + " WHERE `sub_category_id` = '" + savedata.id + "'";
                    }

                    console.log('query ' , query);

                    connection.query(query, function(err, results, field) {
                        if (err) {
                            res.json({ error: err, code: 101 });
                        }

                        if (counterCopy == (object_count - 1)) {
                            connection.end();
                        }
                    });
                });

            }());
        }
    }
}









/*get all eventbrite own events*/
exports.geteventbriteevents = function(req, res) {
    console.log('geteventbriteevents called');

    request.get({
        headers: { Authorization: 'Bearer ' + 'P3KTZDWBSBEH7BSBAGS2' },
        url: 'https://www.eventbriteapi.com/v3/search/events/'
    }, function(error, response, body) {
        if (error) {
            //console.log('error ' , error);
        }
        if (body) {
            console.log('body ', body);
            //console.log('body ' , toJSON(body));
        }
    });
}

/*get all eventbrite contact list*/
exports.geteventbritecontactlists = function(req, res) {

    request.get({
        headers: { Authorization: 'Bearer ' + 'P3KTZDWBSBEH7BSBAGS2' },
        url: 'https://www.eventbriteapi.com/v3/users/me/owned_events/'
    }, function(error, response, body) {
        if (error) {
            //console.log('error ' , error);
        }
        if (body) {
            console.log('body ', body);
            //console.log('body ' , toJSON(body));
        }
    });

}