//Constant details
    CONSTANT  =
		{
                    'MYSQL_DB'      	: {
					    host     : '52.39.212.226',
					    user     : 'alisthubmarket',
					    password : 'alisthubmarket@2016',
					    database : 'alisthubmarketing',
					    port     : 3306
		    },                                     // using in db.js
		    'CENTRAL_MYSQL_DB'  : {
					    host     : '192.155.246.146',
					    user     : 'eventhub',
					    password : 'eventhub',
					    database : 'db_eventhub',
					    insecureAuth: true
					    //port     : 8001,
					    
		    },
		    'MONGO_DB'      	:'mongodb://localhost/alistreporting', // using in db.js
		    'USE_SECRET'    	:'alist_reporting', // session secret key using in app.js
		    'BODY_PARSER_LIMIT' :'50mb', // body parser limit using in app.js
		    
		    ////// Test Ticket Sales////
		    'TEST_DATA'         :{
		    "7277803": {
		      "sale_id": "7277803",
		      "event_id": "4117488",
		      "seller_id": "22214",
		      "user_id": "11859930",
		      "transaction_id": "7929662467",
		      "tickets": "1",
		      "confirmation_number": "7868H91G16708348",
		      "total_cost": "29.50",
		      "buyer_fee": "4.50",
		      "seller_fee": "0.00",
		      "buyer_fee_covered": "0",
		      "custom_buyer_fee": "0.00",
		      "addl_fees_total": "0.00",
		      "service_fee_discount": "0.00",
		      "donation": "0.00",
		      "venue_fee": "0.00",
		      "delivery_fee": "0.00",
		      "delivery_type": "2",
		      "discount": "0.00",
		      "cardnumber": "3291",
		      "first_four": null,
		      "date": "2016-01-27 18:24:34",
		      "address": "22 Meadow Drive",
		      "address_2": "",
		      "city": "San Rafael",
		      "state": "CA",
		      "zip": "94903",
		      "country": "US",
		      "phone": "4155070579",
		      "email": "sourcehealing@yahoo.com",
		      "purchase_for": "Christine Hodil",
		      "is_POS": "0",
		      "payment_method": "0",
		      "currency": "USD",
		      "ticket_set": "http://api.showclix.com/Sale/7277803/ticket_set",
		      "cancel_set": "http://api.showclix.com/Sale/7277803/cancel_set"
		    },
		    "7278983": {
		      "sale_id": "7278983",
		      "event_id": "4117488",
		      "seller_id": "22214",
		      "user_id": "6696407",
		      "transaction_id": "7929911115",
		      "tickets": "2",
		      "confirmation_number": "6U676F1U16711106",
		      "total_cost": "59.00",
		      "buyer_fee": "9.00",
		      "seller_fee": "0.00",
		      "buyer_fee_covered": "0",
		      "custom_buyer_fee": "0.00",
		      "addl_fees_total": "0.00",
		      "service_fee_discount": "0.00",
		      "donation": "0.00",
		      "venue_fee": "0.00",
		      "delivery_fee": "0.00",
		      "delivery_type": "2",
		      "discount": "0.00",
		      "cardnumber": "3063",
		      "first_four": null,
		      "date": "2016-01-27 20:18:59",
		      "address": "70 Temelec Cir",
		      "address_2": "",
		      "city": "Sonoma",
		      "state": "CA",
		      "zip": "95476",
		      "country": "US",
		      "phone": "9282030346",
		      "email": "kbryant11@msn.com",
		      "purchase_for": "Kathleen Bryant",
		      "is_POS": "0",
		      "payment_method": "0",
		      "currency": "USD",
		      "ticket_set": "http://api.showclix.com/Sale/7278983/ticket_set",
		      "cancel_set": "http://api.showclix.com/Sale/7278983/cancel_set"
		    },
		    "7279751": {
		      "sale_id": "7279751",
		      "event_id": "4117488",
		      "seller_id": "22214",
		      "user_id": "16809110",
		      "transaction_id": "7930069019",
		      "tickets": "1",
		      "confirmation_number": "969ZZ9ZF16713223",
		      "total_cost": "29.50",
		      "buyer_fee": "4.50",
		      "seller_fee": "0.00",
		      "buyer_fee_covered": "0",
		      "custom_buyer_fee": "0.00",
		      "addl_fees_total": "0.00",
		      "service_fee_discount": "0.00",
		      "donation": "0.00",
		      "venue_fee": "0.00",
		      "delivery_fee": "0.00",
		      "delivery_type": "4",
		      "discount": "0.00",
		      "cardnumber": "8372",
		      "first_four": null,
		      "date": "2016-01-27 21:51:18",
		      "address": "260 Bolinas Road",
		      "address_2": "",
		      "city": "Fairfax",
		      "state": "CA",
		      "zip": "94930",
		      "country": "US",
		      "phone": "6195490416",
		      "email": "dw_snyder@hotmail.com",
		      "purchase_for": "David Snyder",
		      "is_POS": "0",
		      "payment_method": "0",
		      "currency": "USD",
		      "ticket_set": "http://api.showclix.com/Sale/7279751/ticket_set",
		      "cancel_set": "http://api.showclix.com/Sale/7279751/cancel_set"
		    },
		    "7284135": {
		      "sale_id": "7284135",
		      "event_id": "4117488",
		      "seller_id": "22214",
		      "user_id": "16819342",
		      "transaction_id": "7931406073",
		      "tickets": "1",
		      "confirmation_number": "G1R687GY16723429",
		      "total_cost": "29.50",
		      "buyer_fee": "4.50",
		      "seller_fee": "0.00",
		      "buyer_fee_covered": "0",
		      "custom_buyer_fee": "0.00",
		      "addl_fees_total": "0.00",
		      "service_fee_discount": "0.00",
		      "donation": "0.00",
		      "venue_fee": "0.00",
		      "delivery_fee": "0.00",
		      "delivery_type": "2",
		      "discount": "0.00",
		      "cardnumber": "3554",
		      "first_four": null,
		      "date": "2016-01-28 11:13:19",
		      "address": "380 Pleasant Hill Rd.",
		      "address_2": "",
		      "city": "Sebastopol",
		      "state": "CA",
		      "zip": "95472",
		      "country": "US",
		      "phone": "7072490205",
		      "email": "dkg@wishwellprod.com",
		      "purchase_for": "Debra Giusti",
		      "is_POS": "0",
		      "payment_method": "0",
		      "currency": "USD",
		      "ticket_set": "http://api.showclix.com/Sale/7284135/ticket_set",
		      "cancel_set": "http://api.showclix.com/Sale/7284135/cancel_set"
		    },
		    "7286677": {
		      "sale_id": "7286677",
		      "event_id": "4117488",
		      "seller_id": "22214",
		      "user_id": "16824896",
		      "transaction_id": "7932145093",
		      "tickets": "4",
		      "confirmation_number": "T5627FDY16728969",
		      "total_cost": "120.00",
		      "buyer_fee": "18.00",
		      "seller_fee": "0.00",
		      "buyer_fee_covered": "0",
		      "custom_buyer_fee": "0.00",
		      "addl_fees_total": "0.00",
		      "service_fee_discount": "0.00",
		      "donation": "2.00",
		      "venue_fee": "0.00",
		      "delivery_fee": "0.00",
		      "delivery_type": "4",
		      "discount": "0.00",
		      "cardnumber": "5701",
		      "first_four": null,
		      "date": "2016-01-28 14:36:19",
		      "address": "1335 Canyon Drive",
		      "address_2": "",
		      "city": "Petaluma",
		      "state": "CA",
		      "zip": "94952",
		      "country": "US",
		      "phone": "7079717947",
		      "email": "liongoodman@gmail.com",
		      "purchase_for": "Lion Goodman",
		      "is_POS": "0",
		      "payment_method": "0",
		      "currency": "USD",
		      "ticket_set": "http://api.showclix.com/Sale/7286677/ticket_set",
		      "cancel_set": "http://api.showclix.com/Sale/7286677/cancel_set"
		    }},
		    
                    ////////////////////////// SHOWCLIX API //////////////////////////////////
                    'SHOWCLIX' : {
			            'PARTER_EMAIL'    : 'varunb@smartdatainc.net',
				    'PARTER_PASSWORD' : 'ALIST1234',
				    'REGISTRATION'    : 'https://admin.showclix.com/api/registration', 
		                    'SALE_TICKET_API' : 'https://api.showclix.com/Sale/search',	
		    
		    },

		}
		     

    module.exports = CONSTANT;