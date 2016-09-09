var baseUrl = "//192.155.246.146:7048";
servicebaseUrl = "//52.39.212.226:4004";
m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
ticketImage='./images/ticket.png';
  weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
  day=[{
    id: '0',
    name: 'Sun'
  }, {
    id: '1',
    name: 'Mon'
  }, {
    id: '2',
    name: 'Tues'
  }, {
    id: '3',
    name: 'Wed'
  }, {
    id: '4',
    name: 'Thurs'
  }, {
    id: '5',
    name: 'Fri'
  }, {
    id: '6',
    name: 'Sat'
  }];
  dates=[{
    id: 1
  }, {
    id: 2
  }, {
    id: 3
  }, {
    id: 4
  }, {
    id: 5
  }, {
    id: 6
  }, {
    id: 7
  }, {
    id: 8
  }, {
    id: 9
  }, {
    id: 10
  }, {
    id: 11
  }, {
    id: 12
  }, {
    id: 13
  }, {
    id: 14
  }, {
    id: 15
  }, {
    id: 16
  }, {
    id: 17
  }, {
    id: 18
  }, {
    id: 19
  }, {
    id: 20
  }, {
    id: 21
  }, {
    id: 22
  }, {
    id: 23
  }, {
    id: 24
  }, {
    id: 25
  }, {
    id: 26
  }, {
    id: 27
  }, {
    id: 28
  }, {
    id: 29
  }, {
    id: 30
  }, {
    id: 31
  }];

hours = [{
    id: 00
  },{
    id: 01
  }, {
    id: 02
  }, {
    id: 03
  }, {
    id: 04
  }, {
    id: 05
  }, {
    id: 06
  }, {
    id: 07
  }, {
    id: 08
  }, {
    id: 09
  }, {
    id: 10
  }, {
    id: 11
  }, {
    id: 12
  }, {
    id: 13
  }, {
    id: 14
  }, {
    id: 15
  }, {
    id: 16
  }, {
    id: 17
  }, {
    id: 18
  }, {
    id: 19
  }, {
    id: 20
  }, {
    id: 21
  }, {
    id: 22
  }, {
    id: 23
  }];
  minutes = seconds =[{
    id: 01
  }, {
    id: 02
  }, {
    id: 03
  }, {
    id: 04
  }, {
    id: 05
  }, {
    id: 06
  }, {
    id: 07
  }, {
    id: 08
  }, {
    id: 09
  }, {
    id: 10
  }, {
    id: 11
  }, {
    id: 12
  }, {
    id: 13
  }, {
    id: 14
  }, {
    id: 15
  }, {
    id: 16
  }, {
    id: 17
  }, {
    id: 18
  }, {
    id: 19
  }, {
    id: 20
  }, {
    id: 21
  }, {
    id: 22
  }, {
    id: 23
  }, {
    id: 24
  }, {
    id: 25
  }, {
    id: 26
  }, {
    id: 27
  }, {
    id: 28
  }, {
    id: 29
  }, {
    id: 30
  }, {
    id: 31
  }, {
    id: 32
  }, {
    id: 33
  }, {
    id: 34
  }, {
    id: 35
  }, {
    id: 36
  }, {
    id: 37
  }, {
    id: 38
  }, {
    id: 39
  }, {
    id: 40
  }, {
    id: 41
  }, {
    id: 42
  }, {
    id: 43
  }, {
    id: 44
  }, {
    id: 45
  }, {
    id: 46
  }, {
    id: 47
  }, {
    id: 48
  }, {
    id: 49
  }, {
    id: 50
  }, {
    id: 51
  }, {
    id: 52
  }, {
    id: 53
  }, {
    id: 54
  }, {
    id: 55
  }, {
    id: 56
  }, {
    id: 57
  }, {
    id: 58
  }, {
    id: 59
  }, {
    id: 60
  }
  ];




 timeout = [{
    value: 300,
    minutes : '5 minutes',
  },
{
    value: 360,
    minutes : '6 minutes',
  },
{
    value: 420,
    minutes : '7 minutes',
  },
{
    value: 480,
    minutes : '8 minutes',
  },
{
    value: 540,
    minutes : '9 minutes',
  },
{
    value: 600,
    minutes : '10 minutes',
  },
{
    value: 660,
    minutes : '11 minutes',
  },
{
    value: 720,
    minutes : '12 minutes',
  },
{
    value: 780,
    minutes : '13 minutes',
  },
{
    value: 840,
    minutes : '14 minutes',
  },
{
    value: 900,
    minutes : '15 minutes',
  },
{
    value: 960,
    minutes : '16 minutes',
  },
{
    value: 1020,
    minutes : '17 minutes',
  },
{
    value: 1080,
    minutes : '18 minutes',
  },
{
    value: 1140,
    minutes : '19 minutes',
  },
{
    value: 1200,
    minutes : '20 minutes',
  },
{
    value: 1260,
    minutes : '21 minutes',
  },
{
    value: 1320,
    minutes : '22 minutes',
  },
{
    value: 1380,
    minutes : '23 minutes',
  },
{
    value: 1440,
    minutes : '24 minutes',
  },
{
    value: 1500,
    minutes : '25 minutes',
  },
{
    value: 1560,
    minutes : '26 minutes',
  },
{
    value: 1620,
    minutes : '27 minutes',
  },

{
    value: 1680,
    minutes : '28 minutes',
  },

{
    value: 1740,
    minutes : '29 minutes',
  },

{
    value: 1800,
    minutes : '30 minutes',
  }];


 custom_when_options = [{
         "name": "Before Discount", 
         'id': 1 
       },
        { 
          "name": "After Discount",
         'id': 2
        }];


custom_fee_type_options = [{ 
        "name": "Fixed Amount",
         'id': 1 
       },
      { 
        "name": "Percentage",
        'id': 2 
      }];


var webservices = {

    "getUserregister": baseUrl + "/webservices/register",
    "checkUnique": baseUrl + "/webservices/checkUnique",
    "getUserlogin": baseUrl + "/webservices/login_test",
    "forgetPassword": baseUrl + "/webservices/forgetPassword",
    "resetPassword": baseUrl + "/webservices/resetPassword",
    "confirmationEmail": baseUrl + "/webservices/confirmationEmail",
    "checkTokenExpiry": baseUrl + "/webservices/check_token_expiry",
    "refreshTokenExpiry": baseUrl + "/webservices/refresh_token_expiry",
    "checkEmailUnique": baseUrl + "/webservices/checkEmailUnique",
    
    "updateEmailAccount": baseUrl + "/webservices/updateEmailAccount",

    /* Constants for managing venue */
    "getVenues": "/event_setting/venueListing",
    "addVenue": "/event_setting/addVenue",
    "venueOverview": "/event_setting/venueOverview",
    "changeVenueStatus": "/event_setting/changeVenueStatus",
    "deleteVenue": "/event_setting/deleteVenue",
    "duplicateVenue": "/event_setting/duplicateVenue",

    /* Constants for the questions */
    "getQuestions": "/event_setting/getQuestions",
    "addQuestion": "/event_setting/addQuestion",
    "questionOverview": "/event_setting/questionOverview",
    "changeQuestionStatus": "/event_setting/changeQuestionStatus",
    "deleteQuestion": "/event_setting/deleteQuestion",
    "exportQuestionCSV": "/event_setting/exportQuestionCSV",
    "getSelectedQuestion": "/event_setting/getSelectedQuestion",
    "getQuestionsOfEvent" : "/event_setting/getQuestionsOfEvent",

    /* Constants for the product */
    "getSettingCount": "/event_setting/getSettingCount",
    "getProducts": "/event_setting/getSettingProducts",
    "addProduct": "/event_setting/addProduct",
    "productOverview": "/event_setting/productOverview",
    "changeProductStatus": "/event_setting/changeProductStatus",
    "uploadProductImage": "/event_setting/uploadProductImage",

    /* Constants for the event and event setting */
    "saveEvent": "/event/saveEvent",
    "viewEvents": "/event_setting/viewEvents", //makeAssignment
    "checkeventurl":"/event/checkeventurl",
    "makeAssignment": "/event_setting/makeAssignment",
    "delAssignment": "/event_setting/delAssignment",
    "deleteProduct": "/event_setting/deleteProduct",
    "saveProductSetting": "/event_setting/saveProductSetting",
    "getProductSetting": "/event_setting/getProductSetting",
    "saverecurringEvent": "/event/saverecurringEvent",
    "updatesociallink": "/event/updatesociallink",


    /////get event category////
    "getEventsdetail": "/event/getEventsdetail",
    "getEvents": "/event/getEvents",
    "getEvent": "/event/getEvent",
    "getEventCategory": "/event/getEventCategory",
    "deleteEvent": "/event/deleteEvent",

    "addComment": "/event/addComment",
    "getComment": "/event/getComment",

    "getSeriesEvent": "/event/getSeriesEvent",


    // event package

    /////get event category////

    "getUpcommingEvent": "/event/getUpcommingEvent",
    "getPastEvent": "/event/getPastEvent",
    "getEventSeries": "/event/getEventSeries",
    "getAllEvent": "/event/getAllEvent",
    "getEventDates": "/event/getEventDates",



     /////widget //////////

    "saveEventWidgets":"/widget/saveEventWidgets",
    "savewidget":"/widget/savewidget",
    "getWidgetEvents":"/widget/getWidgetEvents",
    "editEvent_widgets":"/widget/editEvent_widgets",
    "getUpcomingEvent":"/widget/getUpcomingEvent",
     
    "getWidget":"/widget/getWidget",
    "getWidgetDetail":"/widget/getWidgetDetail",

    //contact us/////
    "submitContact":"contact/submitContact",
    "stay_connected":"contact/stay_connected",
    //tracking tag
    "saveTag":"/tracking/saveTag",
    "getTag":"/tracking/getTag",
    "getTagDetail":"/tracking/getTagDetail",
    "deleteTag":"/tracking/deleteTag",
    // event package

    //"stepOneEventPackage"  :  "/event/stepOneEventPackage",
    "stepOneEventPackage" : "/package/stepOneEventPackage",
    "getPackage" : "/package/getPackage",
    "getEventsInPackage" : "/package/getEventsInPackage",
    "getBundlesInPackage" : "/package/getBundlesInPackage",
    "getProductsInPackage" : "/package/getProductsInPackage",
    "addBundleInPackage" : "/package/addBundleInPackage",
    "getBundleProductsInPackage" : "/package/getBundleProductsInPackage",
    "getEventPriceLevelInPackage" : "/package/getEventPriceLevelInPackage",
    "getAllEventsPriceLevelInPackage" : "/package/getAllEventsPriceLevelInPackage",
    "updateBundleInPackage" : "/package/updateBundleInPackage",
    "getAllProductsInPackage" : "/package/getAllProductsInPackage",
    "addEventProductInPackage" : "/package/addEventProductInPackage",
    "getEventProductsInPackage" : "/package/getEventProductsInPackage",
    "postSecondStepPackageData" : "/package/postSecondStepPackageData" ,
    "postThirdStepPackageData" : "/package/postThirdStepPackageData" ,
    "getEventCategoriesList" : "/package/getEventCategoriesList" ,
    "viewSelectedEvents" : "/package/viewSelectedEvents",
    "getPackageProductDetail" : "/package/getPackageProductDetail",
    "getPackageProducts" : "/package/getPackageProducts",
    "removePackageProduct" : "/package/removePackageProduct",
    "changePackageBundleStatus" : "/package/changePackageBundleStatus",
    "removePackageBundle" : "/package/removePackageBundle",
    "getBundleDetailOfPackage" : "/package/getBundleDetailOfPackage" ,
    "saveAdvanceSettingsOfPackage" : "/package/saveAdvanceSettingsOfPackage" ,
    "getAdvanceSettingOfPackage" : "/package/getAdvanceSettingOfPackage",
    "getAllPackageEvent": "/package/getAllPackageEvent",
    "checkEventExist": "/package/checkEventExist",
    "viewUpcomingEventsOfPackage": "/package/viewUpcomingEventsOfPackage", 
    "checkPackageUrl" : "/package/checkPackageUrl",


    /* Constants for the discount module */
    "getDiscounts": "/event_setting/getDiscounts",
    "addDiscount": "/event_setting/addDiscount",
    "checkUniqueDiscount": "/event_setting/checkUniqueDiscount",
    "assignDiscount": "/event_setting/assignDiscount",
    "discountOverview": "/event_setting/discountOverview",
    "changeDiscountStatus": "/event_setting/changeDiscountStatus",
    "deleteDiscount": "/event_setting/deleteDiscount",
    "makeDiscountAssignment": "/event_setting/makeDiscountAssignment",
    "exportDiscountCSV": "/event_setting/exportDiscountCSV",
    "getSelectedDiscount": "/event_setting/getSelectedDiscount",
    "getEventPriceLevels": "/event_setting/getEventPriceLevels",
    "saveFinalAssignmet": "/event_setting/saveFinalAssignmet",
    "discountAssignmentOverview": "/event_setting/discountAssignmentOverview",
    "delDiscountAssignment": "/event_setting/delDiscountAssignment",
    "getAssignDiscountDetails": "/event_setting/getAssignDiscountDetails",
    "updateFinalAssignment": "/event_setting/updateFinalAssignment",
    "delPriceLevelDiscAssignment": "/event_setting/delPriceLevelDiscAssignment",
    "getDiscountsOfEvent": "/event_setting/getDiscountsOfEvent",
    "getCountDiscountsOfEvent" : "/event_setting/getCountDiscountsOfEvent",
    

    /* Constants for the bundle module */
    "getBundles": "/event_setting/getBundles",
    "addBundle": "/event_setting/addBundle",
    "updateBundle": "/event_setting/updateBundle",
    "bundleOverview": "/event_setting/bundleOverview",
    "getBundleProducts": "/event_setting/getBundleProducts",
    "changeBundleStatus": "/event_setting/changeBundleStatus",
    "removeBundle": "/event_setting/removeBundle",
    "getBundleDetail": "/event_setting/getBundleDetail",
    "updateSeriesBundle": "/event/updateSeriesBundle",

    /* Constants for the manage users */
    "addUser": "/user/addUser",
    "getUser": "/user/getUser",
    "userOverview": "/user/userOverview",
    "userdetail" : "/user/userdetail",
    //"editUser":"/user/editUser",
    "deleteUser": "/user/deleteUser",
    "checksellerUser": "/user/checksellerUser",
    "changeUserStatus": "user/changeUserStatus",
    "checkSellerSubUser": "/user/checkSellerSubUser",
    "getsubSellerUser": "/user/getsubSellerUser",
    "updatesubsellerPassword": "/user/updatesubsellerPassword",
    "updatesubSellerUser": "/user/updatesubSellerUser",

    /*  CREATE BY DK   */
    /*Constants for the Customers Management*/
    "addCustomer": "/customers/addCustomer",
    "getCustomer": "/customers/getCustomer",
    "deleteCustomer": "/customers/deleteCustomer",
    "changeCustomerStatus": "/customers/changeCustomerStatus",
    "customerOverview": "/customers/customerOverview",
    "uploadfilecsv": "/customers/uploadfilecsv",
    "exportCSV": "/customers/exportCSV",
    "getBlacklist": "/customers/getBlacklist",

    "uploadBlacklist": "/customers/uploadBlacklist",
    /*   D K  */
    /* Constants for the My account page */
    "updateUser": baseUrl + "/webservices/updateUser",
    "updateSocial": baseUrl + "/webservices/updateSocial",
    "updatePassword": baseUrl + "/webservices/updatePassword",
    "updateEmail": baseUrl + "/webservices/updateEmail",
    "getData": baseUrl + "/webservices/getData",
    "updateUserAdvSetting": baseUrl + "/webservices/updateUserAdvSetting",
    "getSocialData": "/profile/getData",

    /* Constants for the create event step 2 price level */
    "savepricelevel": "/event/savepricelevel",
    "saveseriespricelevel": "/event/saveseriespricelevel", // for series
    "getPricelevel": "/event/getPricelevel",
    "removepricelevel": "/event/removepricelevel",
    "removeseriespricelevel": "/event/removeseriespricelevel", // for series
    "changePricelevelStatus": "/event/changePricelevelStatus",
    "changeseriesPricelevelStatus": "/event/changeseriesPricelevelStatus", // for series
    "getSinglePricelevel": "/event/getSinglePricelevel",
    "postPriceChange": "/event/postPriceChange",
    "postseriesPriceChange": "/event/postseriesPriceChange",
    "addseriesBundle": "/event/addseriesBundle",
    "getPriceLevelChange":"/event/getPriceLevelChange",
    "delete_level_schedule":"/event/delete_level_schedule",
    /* Constants for saving the financial settings */
    "addFinancialDetails": "/account/addFinancialDetails",
    "getFinancialDetails": "/account/getFinancialDetails",

    /* constants for fetching the common data*/
    "getCountries": "/common/getCountries",
    "getUSAStates": "/common/getUSAStates",

    //Financial Settings   

    "addCustomFinancialDetails": "/account/addCustomFinancialDetails",
    "viewCustomFinancialSetting": "/account/viewCustomFinancialSetting",
    "getCustomFinancialSetting": "/account/getCustomFinancialSetting",
    "checkAlreadyAddedMerchant": "/account/checkAlreadyAddedMerchant",





    //package events
    "savePackage": "/package/savePackage",


    "saverecurringPackage": "/package/saverecurringPackage",
    //add schedul///////////
    "add_schedule": "/add_schedule/add_schedule",
    "saverecurringschedule": "/add_schedule/saverecurringschedule",



    //save second step data
    "secondStepdata": "/event/savesecondstepdata",
    "secondSeriesStepdata": "/event/savesecondSeriesstepdata",

    // advance settings of events
    "saveAdvanceSettings": "/event/saveAdvanceSettings",
    "getAdvanceSetting": "/event/getAdvanceSetting",

    //Step 3 look and feel
    "getlookAndFeeltemplate": "event/getlookAndFeeltemplate",
    "getpreviewImage": "event/getpreviewImage",
    "getTemplate": "event/getTemplate",
    "addlookAndFeelImage": "event/addlookAndFeelImage",
    "getlookandFeelTemplatehtml": "event/getlookandFeelTemplatehtml",
    "getShowclixPriceLevel": "event/getShowclixPriceLevel",

    //Add event product
    "addEventProduct": "/event_setting/addEventProduct",
    "addSeriesEventProduct": "/event/addSeriesEventProduct",
    "getEventSeriesDates": "/event/getSeriesDates",
    //Add event product
    "getEventProducts": "/event_setting/getEventProducts",
    "getEventProductDetail": "/event_setting/getEventProductDetail",
    "removeEventProduct": "/event_setting/removeEventProduct",
    "getEventPriceLevel": "/event_setting/getEventPriceLevel",
    "getAllProducts": "/event_setting/getAllProducts",
    "removeSeriesEventProduct": "/event/removeSeriesEventProduct",
    "getEventStep3":"event/getEventStep3",
    //Event step 4 
    "getSettings": "/event/getSettings",
    "saveSetting": "/event/saveSetting",
    "saveSeriesSetting": "/event/saveSeriesSetting",
    "saveInventory": "/event/saveInventory",

//event overview
    "addEmailReport" : "/event/addEmailReport",
    "getEmailReport" : "/event/getEmailReport",
    "editEmailReport" : "/event/editEmailReport",
    "getEmailReportById" : "/event/getEmailReportById",
    "getEmailTemplateOfEvent" : "/event/getEmailTemplateOfEvent",
    "assignEmailTemplate" : "/event/assignEmailTemplate",
    "deleteEmailReportById" : "/event/deleteEmailReportById" ,
    "pauseSales" : "/event/pauseSales" ,
    "addFavouriteEvent" : "/event/addFavouriteEvent",

    //event series overview

    "pauseSalesSeries" : "/event/pauseSalesSeries" ,
    "addFavouriteEventSeries" : "/event/addFavouriteEventSeries",
    "delEventSeries" : "/event/delEventSeries",
    "getEmailReportSeries" : "/event/getEmailReportSeries" ,
    "addEmailReportSeries" : "/event/addEmailReportSeries" ,
    "deleteEmailReportByIdSeries" : "/event/deleteEmailReportByIdSeries" ,
    "editEmailReportSeries" : "/event/editEmailReportSeries" ,
    "getEmailReportByIdSeries" : "/event/getEmailReportByIdSeries" ,
    "getEmailTemplateOfEventSeries" : "/event/getEmailTemplateOfEventSeries" ,
    "assignEmailTemplateSeries" : "/event/assignEmailTemplateSeries" ,
    "unassignQuestionSeries" : "/event_setting/unassignQuestionSeries" ,
    "unassignQuestionEvent" : "/event_setting/unassignQuestionEvent" ,
    "makeAssignmentOverview" : "/event_setting/makeAssignmentOverview" ,
    
   
    //Permisssion module routes
    "getPerModules": "/user/getPerModules",
    "savePerModules": "/user/savePerModules",

    //assign question postition

    "saveQuestionLocationPosition" : "/event_setting/saveQuestionLocationPosition" ,
    "getQuestionsOfEventOfPackage" : "/package/getQuestionsOfEventOfPackage" ,
    "delPackage" : "/package/delPackage" ,
    "addFavouritePackage" : "/package/addFavouritePackage" ,

    //Sales report
    "getSalesData" : "/report/getSalesData" ,    
    "getReportEvent": "/report/getReportEvent",
    "getEventSaleData": "/report/getEventSaleData",
    
    //signupSeller
    "signupSeller" : "/profile/signup_seller"
}

var global_message = {
    /* global */
    "fillMandatoryField": 'Enter all required fields.',
    /* Constants for Check Unique Email */
    "EmailAvailable": "Available",

    /* Constants for Sign Up Process */
    "EmailExist": "This email is already registered.Please try another.",
    "SavingError": "Error in saving !",
    "SignupSuccess": "Registration email sent to your registered email. Open your email to finish signup.If you don't see alistixs email in your inbox within 15 minutes, look for it in your junk mail folder. If you find it there, please mark the email as 'Not Junk'.",

    /* Constants for Forget Process */
    "ForgetPassword": "Check your registered email to reset your password quickly.",
    "ForgetEmailBlank": "Please enter registered email address.",
    "ForgetEmailError": "Your search didn't match any accounts. Enter your registered email address again.",
    "passwordChanged": "Password has been changed successfully.",
    "serverErrorPasswordReset": "There some problem in server side to set new password , try after some time .",
    "retypeSamePassword": "Password and confirm password do not match.",

    /* Constants for Email Confirmation - signup process */
    "ActivatedMessage": "Your account has been activated, please sign in.",
    "ErrorInActivation": "There is some problem, please try after some time.",
    "AccountNotActivated": "You have not verified your email account, please see the verification email you must have received in your registered email",

    /* Constants for Login */
    "LoginNotMatchingError": "The email and password you entered don't match.",
    "EmailEmpty": "Enter a valid email ",
    "LoginAuthNotMatchingError": "Your account has not been activated till now . Please go to your registered email to complete activation process.",
    "AccountBlocked": "Account Blocked",
    "InfoNotUpdated": "Some error",
    "InvalidPassword": "The password that you've entered is incorrect.",
    "InvalidEmail": "The email address that you've entered doesn't match any account.",
    "InvalidUserPassword": "The email and password you entered don't match",

    /* Constants for Financial information */
    "savedFinancialInformation": 'Financial information saved successfully',
    "savedMerchantFinancialInformation": 'Merchant Financial information saved successfully',
    "selectMerchantType": 'Select Merchant Type',
    "selectCurrencyCode": 'Select Currency Code',
    "emptyAccountiD": 'Enter Account Id',
    "emptyPassword": 'Enter Password',
    "merchantTypeExist": 'This merchant type already exist in our records.Please update the existing one.',
    "enterFirstName": 'Enter First Name',
    "enterLastName": 'Enter Last Name',
    "enterEmail": 'Enter Email',
    "enterChequeName": 'Enter Name For Cheque',
    "enterAddress": 'Enter address',
    "selectCountry": 'Select a Country',

    /* Constants for Product information */
    "productSaved": "Product has been saved successfully.",

    /* Constants for Users */
    "userInfoUpated": "User information updated successfully.",
    "infoSaved": "Information updated successfully.",

    /* Constants for Question */
    "QuestionAddValidation": "Please fill all the mandatory fields.",
    "questionUpdated": 'Question updated successfully',
    "questionAdded": 'Question added successfully',

    /*discount*/
    "discountUpdated": 'Discount updated successfully',
    "discountAdded": 'Discount added successfully',
    "endDateError": 'End date must be same or greater than start date',
    "discountAssigned": 'Discount coupon has been assigned to events successfully',
    /*Create Event */
    "step1html": 'modules/step_event/views/step1html.html',
    "bundlehtml": 'modules/step_event/views/bundlehtml.html',
    "pricelevelhtml": 'modules/step_event/views/pricelevelhtml.html',
    "step2html": 'modules/step_event/views/step2.html',
    "step3html": 'modules/step_event/views/step3.html',
    "step4html": 'modules/step_event/views/step4.html',
    "date_error": "Please select start date and end date.",
    "event_step1": "Event Successfully Saved.",
    //import csv popup
    "customerimport": 'modules/customers/views/customerimport.html',
    //import placklist pop up
    "customer_blacklist": 'modules/customers/views/customer_blacklist.html',

    "event_step2": "Price & links Successfully Saved.",
    "event_step1_msg": "Please update the event detail.",
    "event_step2_msg": "Please update the price and links data of event.",
    "date_comparison": 'End time must be greater than start time. ',
    "start_date": 'Kindly select start time.',
    "bundle_save": "Bundle status changed successfully.",
    "price_level_remove": "Price level has been removed.",
    "price_level_add": "Price level has been added.",
    "price_level_update": "Price level change has been updated.",
    "price_level_error": "Error in price change updation.",
    "error_in_step1": "Please update the step 1",
    "bundle_update": "Bundle information has been updated successfully.",
    "bundle_add": "Bundle information has been added.",

     "save_package": "Package information has been saved successfully.",
     "noEventToIncludeInPackage" : "There is no any future event, please create it firsty to include it in package." ,


    /**/
    "advanceSettingSaved": "Advance settings saved successfully",
    "advanceSettingSavingError": "Error while saving advance settings",
    "successChangeEmail": "Email has been changed successfully.",
    "errorChangeEmail": "There is some problem in saving data . Please try after some time .",
    "errorExistChangeEmail": "This email already used in system , Please enter another email.",


    /* Product event popup/listing alerts*/
    "event_product_update": "Product information has been updated successfully.",
    "event_product_add": "Product information has been added.",
    "event_product_delete": "Product has been deleted successfully.",

    /* My account section **/
    "fetchError": "There is some problem on Sever side , Please try after some time .",

    "saveEmailReport" : "Email report saved successfully.",

    // package overview




}

var appConstants = {
    "authorizationKey": localStorage.getItem("ngStorage-auth_token")
}

var headerConstants = {
    "json": "application/json",
}

/*************************************** SHOW CLICKS SERVICES CENTER *********************************************/
/*****************************************************************************************************************/
/*Showclick Server posting services declaration 
Created : 2016-05-23
Created By: Manoj Singh */
/******************************************************************************************************************/
/******************************************************************************************************************/

var showclixServer = "https://admin.showclix.com";
var showclixAPIServer = "http://api.showclix.com";

var showclix_headerConstants = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept": "application/json",
};
var token9 = localStorage.getItem("ngStorage-showclix_token");

var showclix_tokenConstants = {
    //"Content-Type": "application/json; charset=UTF-8",
    //"Accept": "application/json",
    "Content-Type": "application/json",
    //"Access-Control-Allow-Origin":"*",
    "X-API-Token": "c09f282dfd94767749fd2c2d7cca4f36b0c590fe56ace77dd18bb254130e5fd1"

};

var showclix_webservices = {
    /* Service To generate token on showclicks */
    "generateToken": "/profile/showclix_login",
    //"generateToken": showclixServer+"/api/registration",
    /* Services for Sign up on showclicks Seller */
    "signUp": showclixAPIServer + "/Seller",
    /* Services for Add Venue on showclicks */
    "addVenue": showclixAPIServer + "/Venue",

};

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

