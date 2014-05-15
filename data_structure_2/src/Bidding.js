function Bidding(sms_json) {

}

Bidding.create_new_bid = function (activity_id) {
    var activities = Activity.get_activities();
    var current_activity = Activity.get_the_activity(activity_id)
    var counter = current_activity.bids.length + 1;
    var bid_name = "竞价" + counter;
    _.map(activities, function (value, key) {
        if (key == activity_id) {
            value.bids.push(bid_name);
            value.biddings[bid_name] = [];
        }
    });
    localStorage.setItem("activities", JSON.stringify(activities));
};


Bidding.sign_up_sms = function (sms_json) {
    if (localStorage.is_bidding == "true") {
        if (_.find(Activity.get_the_activity(Activity.get_current_activity()).sign_ups, function (sign_up_people) {
            return sign_up_people.phone == sms_json.messages[0].phone;
        }) !== undefined) {
            return Bidding.judge_same(sms_json)
        }
    }
};


Bidding.judge_same = function (sms_json) {
    var current_activity = Activity.get_currently_active_biddings();
    var current_bid = Activity.get_current_bid();
    var bidding = Bidding.apply(sms_json)
    if (_.find(current_activity, function (the_bidding) {
        return the_bidding.phone == bidding.phone
    }) == undefined) {
        return Bidding.save(sms_json);
    }
}


Bidding.apply = function (sms_json) {
    var bidding = {}
    bidding.phone = sms_json.messages[0].phone;
    bidding.price = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
    return bidding
}


Bidding.save = function (sms_json) {
    var activities = Activity.get_activities();
    var current_bid = Activity.get_current_bid();
    var bidding = Bidding.apply(sms_json)
    _.each(activities, function (value, key) {
        if (key == Activity.get_current_activity()) {
            value.biddings[current_bid].push(bidding);
        }
    });
    localStorage.setItem('activities', JSON.stringify(activities));
}

