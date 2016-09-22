
var localbaseUrl   = "//52.39.212.226:4009";

var baseUrl = "//192.155.246.146:7048";
var servicebaseUrl = "//52.39.212.226:4004";

var localhostUrl="";


var googleapiurl = 'http://192.155.246.146:8280/googleadwordsapi/adword/examples/AdWords/v201603/';
var webservices = {	  

	"getUserregister" : baseUrl + "/webservices/register",
        "checkUnique" : baseUrl + "/webservices/checkUnique",
        "getUserlogin" : baseUrl + "/webservices/login",
        "forgetPassword" : baseUrl + "/webservices/forgetPassword",
        "resetPassword" : baseUrl + "/webservices/resetPassword",
        "confirmationEmail" : baseUrl + "/webservices/confirmationEmail",
	"checkEmailUnique": baseUrl + "/webservices/checkEmailUnique",
        "updateEmailAccount": baseUrl + "/webservices/updateEmailAccount",
	/* Constants for the My account page */
	"updateUser": baseUrl + "/webservices/updateUser",
	"updateSocial": baseUrl + "/webservices/updateSocial",
	"updatePassword": baseUrl + "/webservices/updatePassword",
	"updateEmail": baseUrl + "/webservices/updateEmail",
	"getData": baseUrl + "/webservices/getData",
	"updateUserAdvSetting": baseUrl + "/webservices/updateUserAdvSetting",
	//////////////// baseurls services end //////////////////////////////
	
        "getgooglecampaignreports":localhostUrl+"/networks/getgooglecampaignreports",
        "getcampaignreportlist":localhostUrl+"/networks/getcampaignreportlist",
        "addcampaignreportlist":localhostUrl+"/networks/addcampaignreportlist",
        "reportdetails":localhostUrl+"/networks/reportdetails",
        "callapiforcampaignreport":localhostUrl+"/networks/callapiforcampaignreport",
        "getfacebookcampaignreports":localhostUrl+"/networks/getfacebookcampaignreports",
        "getgooglecampaignreportsdetails":localhostUrl+"/networks/getgooglecampaignreportsdetails",
        "configureaccounts":localhostUrl+"/networks/configureaccounts",
        "getassociatedaccount":localhostUrl+"/networks/getassociatedaccount",
        
        "geteventbritetoken":localhostUrl+"/networks/geteventbritetoken",
        "geteventbritetokenstep2":localhostUrl+"/networks/geteventbritetokenstep2",
        "geteventbritemyprofile":localhostUrl+"/networks/geteventbritemyprofile",
        "geteventbriteownedevents":localhostUrl+"/networks/geteventbriteownedevents",
        "geteventbriteorganizers":localhostUrl+"/networks/geteventbriteorganizers",
        "geteventbritevenues":localhostUrl+"/networks/geteventbritevenues",
        "geteventbritecategories":localhostUrl+"/networks/geteventbritecategories",
        "geteventbritesubcategories":localhostUrl+"/networks/geteventbritesubcategories",
        "geteventbriteevents":localhostUrl+"/networks/geteventbriteevents",
        "geteventbritecontactlists":localhostUrl+"/networks/geteventbritecontactlists",
	
	
	///////////////////////////////////// NEW services ///////////////////////////////
	"getSummaryReport":"/networks/getSummaryReport",
}

var global_message = {
    "EmailAvailable" : "Available",
    "EmailExist" : "Already Exist!",
    "SavingError" : "Error in saving !",
    "SignupSuccess" : "Email send to you , Please go to email to activate your account.",
    "ForgetPassword" : "Email has been sent to you for reset new password.",
    "ForgetEmailError" : "Please enter correct Email.",
    "ActivatedMessage" : "Your account has been activated now , you can sign in your account .",
    "ErrorInActivation" : "There is some problem in server , Please try some time.",
    "eventSaved" : "Event has been Selected, Please choose Network",
    "eventError" : "Some Error Occured, Please try again.",
    "networkSaved" : "Network has beed added with campaign",
    "networkError" : "Some Error Occured, Please try again.",
    "date_comparison":'End time must be greater than start time. ',
    "endDateError" : 'End date must be same or greater than start date',
    "minbudgetamount":'The entered Budget is very less!',
    "dashboard_fetch_err":'There is some problem in server, Please try after some time.'
}
 
var appConstants = {
	"authorizationKey": "dGF4aTphcHBsaWNhdGlvbg=="
}
var headerConstants = {
	"json": "application/json"
} 
var authConstants = {
    "json": "application/json",
    "Content-Type": "Authorization"
}
var googleadwordsapi = {
    'getgooglekeywords': googleapiurl + 'Optimization/GetKeywordIdeas.php',
    'getgoogleplacements' : googleapiurl + 'Optimization/GetPlacementIdeas.php',
    'addgooglecampaign' : googleapiurl + 'BasicOperations/AddCampaigns_Development.php',
}


var userlibrarypath = "http://localhost:5504/images/userlibrary";


/// loader constants start.
var isSemi = false;
var radius = 70;
var LOADER_CONS = {
                   current : 0,
                   max : 100,
                   duration : 800,
                   stroke : 8,
                   radius : 70,
                   isSemi : isSemi,
                   currentColor : '#c129b9',
                   bgColor : '#eaeaea',
                   currentAnimation : 'easeOutCubic',
                   animationDelay : 0,
                   getStyle : function(){
      var transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';
      return {
	  'top': isSemi ? 'auto' : '93%',
	  'bottom': isSemi ? '5%' : 'auto',
	  'left': '49%',
	  'transform': transform,
	  '-moz-transform': transform,
	  '-webkit-transform': transform,
	  'font-size': radius/3.5 + 'px'
      };
    }
                }
/// loader constants end.


var CONSTANT_GR  = {
    "xData": [0.287166,1.298953,3.310644,1.321583,5.345676,9.356738,7.366782],
    "datasets": [{
        "name": "Sales",
        "data": [13.833,12.524,11.441,10.651,9.961,4.566,4.617],
        "unit": "$",
        "type": "line",
        "valueDecimals": 1
    }, {
        "name": "Facebook",
        "data": [26.857,27,27.111,27.2,27.272,30.545,32.181],
        "unit": "$",
        "type": "area",
        "valueDecimals": 0
    }, {
        "name": "Email",
        "data": [101,98,103,115,124,128,133],
        "unit": "",
        "type": "area",
        "valueDecimals": 0
    }]
};
