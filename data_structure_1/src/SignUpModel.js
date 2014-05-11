function SignUp() {
};

SignUp.activity_sign_up_sms = function (sms_json) {
    if (localStorage.is_signing_up == "true") {
        var activities = JSON.parse(localStorage.activities);
        var current_activity = localStorage.current_activity;
        var sign_ups = [];
        var sign_up = {};
        sign_up['name'] = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
        sign_up['phone'] = sms_json.messages[0].phone;
        if (_.find(sign_ups, function (the_sign_up) {
            return the_sign_up['phone'] == sign_up['phone']
        }) == undefined) {
            sign_ups.push(sign_up);
        }
        activities = _.map(activities, function (activity) {
            activity['name'] == current_activity ? activity['sign_ups'] = sign_ups : '';
            return activity;
        });
        localStorage.setItem('activities', JSON.stringify(activities))
    }
};
