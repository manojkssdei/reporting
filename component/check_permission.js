exports.check_permission = function(req, res, next) {
    var access_modules = ['report_dashboard','combine_report','sales_report','email_report','facebook_report','google_report'];
    var permission     = 'report_dashboard';
    var allow          = access_modules.indexOf(permission);
    console.log(allow);
    if (allow >= 0) {
       return next(); 
    }
    else{
       res.send({"code":101,"message":"authentication failed!"});
    }
}