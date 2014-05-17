function SignUp(sms_json) {
    this.activity_id = Activity.get_current_activity();
    this.name = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
    this.phone = sms_json.messages[0].phone;
};

SignUp.repeat = function (sms_json,sign_up,sign_ups) {
    return _.find(sign_ups, function (the_sign_up) {
        return the_sign_up['phone'] == sign_up['phone']
    });
};


SignUp.active_sms = function (sms_json) {
    if (localStorage.is_signing_up == "true") {
        var sign_up = new SignUp(sms_json);
        var sign_ups = Activity.get_sign_ups();
        var repeat = SignUp.repeat(sms_json,sign_up,sign_ups);
        if (repeat == undefined) {
            sign_ups.push(sign_up);
        }
        localStorage.setItem('sign_ups', JSON.stringify(sign_ups))
    }
};


SignUp.render_sign_ups = function (activity_id) {
    return _.filter(Activity.get_sign_ups(), function (sign_up) {
        return sign_up.activity_id == activity_id;
    });
};

