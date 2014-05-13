function SignUp() {
};

SignUp.active_sms = function (sms_json) {
    if (localStorage.is_signing_up == "true") {
        var sign_ups = [];
        var sign_up = {};
        sign_up['name'] = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
        sign_up['phone'] = sms_json.messages[0].phone;
        if (_.find(sign_ups, function (the_sign_up) {
            return the_sign_up['phone'] == sign_up['phone']
        }) == undefined) {
            sign_ups.push(sign_up);
        }
        var activities = _.map(Activity.get_activities(), function (the_activity) {
            the_activity.id == Activity.get_current_activity() ? the_activity['sign_ups'] = sign_ups : the_activity['sign_ups'] = [];
            return the_activity;
        });
        localStorage.setItem('activities', JSON.stringify(activities))
    }
};
