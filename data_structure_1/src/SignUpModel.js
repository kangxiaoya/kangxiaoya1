function SignUp(sms_json) {
    this.name = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
    this.phone = sms_json.messages[0].phone;
};

SignUp.activity_sign_up_sms = function (sms_json) {
    if (localStorage.is_signing_up == "true") {
        return SignUp.have_sign_up(sms_json);
    }
};

SignUp.have_sign_up = function (sms_json) {
    var sign_ups = [];
    var sign_up = new SignUp(sms_json);
    var repeat = SignUp.find_repeat(sign_up);
    if (repeat == undefined) {
        sign_ups.push(sign_up);
        return SignUp.save(sign_ups);
    }
};

SignUp.find_repeat = function (sign_up) {
    var sign_ups = [];
    return _.find(sign_ups, function (the_sign_up) {
        return the_sign_up['phone'] == sign_up['phone']
    });
};


SignUp.save = function (sign_ups) {
    var activities = Activity.get_activities();
    _.map(activities, function (activity) {
        activity['name'] == Activity.get_current_activity() ? activity['sign_ups'] = sign_ups : '';
    });
    localStorage.setItem('activities', JSON.stringify(activities))
};


SignUp.render_sign_ups = function (activity_name) {
    var current_activity = Activity.get_the_activity(activity_name);
    return current_activity.sign_ups;
};
