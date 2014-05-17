function SignUp(sms_json) {
}

SignUp.active_sms = function (sms_json) {
    if (localStorage.is_signing_up == "true") {
        var sign_ups = Activity.get_sign_ups();
        var sign_up = {};
        sign_up['activity_id'] = Activity.get_current_activity();
        sign_up['name'] = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
        sign_up['phone'] = sms_json.messages[0].phone;
        if (_.find(sign_ups, function (the_sign_up) {
            return the_sign_up['phone'] == sign_up['phone']
        }) == undefined) {
            sign_ups.push(sign_up);
        }
        localStorage.setItem('sign_ups', JSON.stringify(sign_ups))
    }
};


SignUp.render_sign_ups = function (activity_id) {
    return _.filter(Activity.get_sign_ups(), function (sign_up) {
        return sign_up.activity_id == activity_id;
    })
};

