var showClix = require('./../../constant.js');
var request = require('request');
module.exports = function() {

    this.delete_package = function(data, res, next) {
        console.log(data);

        var showclix_id = data.showclix_id;
        request.delete({
            headers: { 'X-API-Token': data.showclix_token },
            url: "https://api.showclix.com/Event/" + showclix_id,
            form: {}
        }, function(error, response, body) {
            return next({ status: 1 });
        });
    }

    this.add_package = function(data, res, next) {

        var input = {

            "user_id": data.showclix_user_id,
            "seller_id": data.showclix_seller_id,
            "event": data.package_name,
            "behavior_set": "5",
            "description": data.package_description,
            "private_event": "0",
            "ages": data.ages,
            "image": data.image_full_url,
            "event_category_id": data.category,
            "date_added": data.created,
            "date_edited": data.modified,
            "event_start": "2016-08-10 00:00:00",
            "sales_open": data.online_sales_open_date_time,
            "sales_close": '00:00',
            "short_name": data.short_name,
            "image_url": data.image,
            "thumbnail_url": data.image,
            "status": 5,
            "event_type": "3",
            "venue_id": "34657",
            "display_image": data.display_image_in_listing,
            "url": data.website,
        };

        if (data.showclix_package_id) {
            input.event_id = data.showclix_package_id;

            delete input.status;
            delete input.date_added;

            var postData = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Pragma': 'no-cache', 'X-API-Token': data.showclix_token },
                url: "http://api.showclix.com/Event/" + data.showclix_package_id,
                body: input,
                json: true
            };

            console.log('------------------******** UPDATE *******--------------------');
            console.log(postData);

            request.put(postData, function(error, response, body) {
                var str = "There is some problem on server. Please try after some time.";

                function isJson(item) {
                    item = typeof item !== "string" ?
                        JSON.stringify(item) :
                        item;

                    try {
                        item = JSON.parse(item);
                    } catch (e) {
                        return false;
                    }

                    if (typeof item === "object" && item !== null) {
                        return true;
                    }

                    return false;
                }
                var dataw = response.body;

                if (isJson(response.body)) {
                    str = response.body;
                }

                if (str.event_id && str.event_id !== undefined) {
                    console.log(" PACKAGE UPDATED AND PACKAGE ID SENT");
                    return next({ status: 1, operation: 'edit_package', location: str.event_id });
                } else {
                    console.log(" SERVER ERROR  ");
                    return next({ status: 0, operation: 'error_in_edit_package', location: "", "error": str });
                }
            });

        } else {

            var postData = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-API-Token': data.showclix_token },
                url: "http://api.showclix.com/Event",
                form: input
            };

            console.log('------------------******** INSERT *******--------------------');
            console.log(postData);

            request.post(postData, function(error, response, body) {
                var str = response.body;
                if (response.headers.location) {
                    return next({ status: 1, operation: 'add_package', location: response.headers.location });
                } else {
                    var percent = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 = percent3.replace("</h3>", "");
                    return next({ status: 0, operation: 'error_in_add_package', location: "", "error": percent3 });
                }
            });

        }

    }

    this.add_events_of_package = function(data, res, next) {
        var input = {
            "package_id": data.package_id,
            "event_id": data.event_id
        };

var showclix_token = 'df2922cfac8fd6709d1976ad3736945ac5d5e767e5a194cc1fe2b6aef30f4b4e';
data.showclix_token = showclix_token;

        var postData = {
            headers: { 'Content-Type': 'application/json', 'Pragma': 'no-cache', 'X-API-Token': data.showclix_token },
            url: "http://api.showclix.com/PackageEventMap",
            body: input,
            json: true
        };

        console.log('postData : ', postData);

        request.post(postData, function(error, response, body) {
            return next({ status: 1 });
            /* Response is not returned from showclix api */
        });

    }

    this.postThirdStepPackageData = function(data, res, next) {
        var input = {
            "user_id": data.showclix_user_id,
            "seller_id": data.showclix_seller_id,
            "event_id": data.showclix_package_id,
            "will_call_ticketing": data.will_call,
            "delivery_type_2": data.print_home,
            "description_2": data.print_description,
            "custom_buyer_fee": data.custom_fee,
            "ticket_note": data.ticket_note,
            "ticket_purchase_limit": data.ticket_transaction_limit,
            "ticket_purchase_timelimit": data.checkout_time_limit,
            "private_event": data.private_event,
            "short_name": data.url_short_name,
            "date_edited": data.modified,
            "status": 5,
        };

        input.donation_live = data.donation == 1 ?'y':'n';
        if (data.donation == 1) {
          input.donation_name = data.donation_name;
        }

        input.approved      = 1;

 /*       input.approval_note = 'Approved by default from alist-ticket';
        input.bos_price     = data.box_office_service_fee;
        input.approval_user_id = data.showclix_user_id;
        input.date_approved = data.modified ;

*/

        var postData = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Pragma': 'no-cache', 'X-API-Token': data.showclix_token },
            url: "http://api.showclix.com/Event/" + data.showclix_package_id,
            body: input,
            json: true
        };

        console.log('------------------********postThirdStepPackageData  UPDATE *******--------------------');
        console.log(postData);

        request.put(postData, function(error, response, body) {

            var str = "There is some problem on server. Please try after some time.";

            function isJson(item) {
                item = typeof item !== "string" ?
                    JSON.stringify(item) :
                    item;

                try {
                    item = JSON.parse(item);
                } catch (e) {
                    return false;
                }

                if (typeof item === "object" && item !== null) {
                    return true;
                }

                return false;
            }
            var dataw = response.body;

            if (isJson(response.body)) {
                str = response.body;
            }

            if (str.event_id && str.event_id !== undefined) {
                console.log(" PACKAGE UPDATED AND PACKAGE ID SENT");
                return next({ status: 1, operation: 'edit_package', location: str.event_id });
            } else {
                console.log(" SERVER ERROR  ");
                return next({ status: 0, operation: 'error_in_edit_package', location: "", "error": str });
            }
        });

    }

}

/*
        data.user_id - (int) 
        data.seller_id - (int) 
        data.event - (string) 
        data.behavior_set - (int) 
        data.description - (string) 
        data.private_event - (int) 1- don't show up in searches and public listings
                                   0- show up in searches and public listings
        data.ages - (int) 0,18,19,21
        data.genre -  (string) Genre of the event. Open Field. e.g. Pop, Classical, Rock, Raffle, etc.
        data.event_type - (int) 3 for General Admission Event, 2 for an Assigned Seating Event
        display_image- int. A value of 1 will show the events image as part of the event listing on ShowClix
        url- string. url to an external event website
        Rule Regex: /^https?:\/\/[a-zA-Z0-9.\-]+\.[a-zA-Z]+(\/.*)?$/

        image- string. code relies on these images in a certain dir, should fix to work with full uri with api
        sales_close- string. hours:minutes before the start of the event that sales should close

        delivery_type-
        1- Print At Home
        0- Always Available
        2- Never Available

        donation_live- string. Should ShowClix accept donations for the seller? Set to 'y' if so.
        donation_name- string. The name of the charity or organization being donated to
        custom_buyer_fee-float. Any custom fees setup for this seller
        buyer_fee-float. probably the most confusing attribute name. this is the TOTAL SERVICE FEE
        private_event
        1- yes
        0- no

        show_seating_chart- int. A value of 1 will bring up the link to the venue seating chart (used to be set in the color_schemes table)
*/
