function SignUp(sms_json) {
    this.name = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
    this.phone = sms_json.messages[0].phone;
};


SignUp.repeat = function (sms_json, sign_ups, sign_up) {
    return  _.find(sign_ups, function (the_sign_up) {
        return the_sign_up['phone'] == sign_up['phone']
    });
};


SignUp.Temporary_save = function (sms_json) {
    var sign_ups = [];
    var sign_up = new SignUp(sms_json);
    var repeat = SignUp.repeat(sms_json, sign_ups, sign_up)
    if (repeat == undefined) {
        sign_ups.push(sign_up);
        return sign_ups
    }
};


SignUp.save = function (sms_json) {
    var sign_ups = SignUp.Temporary_save(sms_json);
    var activities = _.map(Activity.get_activities(), function (the_activity) {
        the_activity.id == Activity.get_current_activity() ? the_activity['sign_ups'] = sign_ups : the_activity['sign_ups'] = [];
        return the_activity;
    });
    localStorage.setItem('activities', JSON.stringify(activities))
};


SignUp.active_sms = function (sms_json) {
    if (localStorage.is_signing_up == "true") {
        SignUp.Temporary_save(sms_json);
        SignUp.save(sms_json);
    }
};


SignUp.render_sign_ups = function (activity_name) {
    var activity = _.find(Activity.get_activities(), function (activity) {
        return activity.name == activity_name;
    });
    return activity.sign_ups;
};