function Bidding(sms_json) {
    this.phone = sms_json.messages[0].phone;
    this.price = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
};


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


Bidding.have_sign_up = function (sms_json) {
    var sign_ups = Activity.get_the_activity(Activity.get_current_activity()).sign_ups;
    return _.find(sign_ups, function (sign_up_people) {
        return sign_up_people.phone == sms_json.messages[0].phone;
    });
};


Bidding.already_sign_up = function (sms_json) {
    var have_sign_up = Bidding.have_sign_up(sms_json);
    if (have_sign_up !== undefined) {
        return Bidding.judge_same(sms_json)
    }
};


Bidding.sign_up_sms = function (sms_json) {
    if (localStorage.is_bidding == "true") {
        return Bidding.already_sign_up(sms_json);
    }
};


Bidding.repeat = function (sms_json) {
    var current_activity = Activity.get_currently_active_biddings();
    var bidding = new Bidding(sms_json)
    return _.find(current_activity, function (the_bidding) {
        return the_bidding.phone == bidding.phone
    });
};


Bidding.judge_same = function (sms_json) {
    var repeat_bidding = Bidding.repeat(sms_json);
    if (repeat_bidding == undefined) {
        return Bidding.save(sms_json);
    }
};


Bidding.save = function (sms_json) {
    var activities = Activity.get_activities();
    var current_bid = Activity.get_current_bid();
    var bidding = new Bidding(sms_json)
    _.each(activities, function (value, key) {
        if (key == Activity.get_current_activity()) {
            value.biddings[current_bid].push(bidding);
        }
    });
    localStorage.setItem('activities', JSON.stringify(activities));
};


function transform_bids_to_view_model(activity_id) {
    return  Activity.get_the_activity(activity_id).bids;
};


Bidding.bid_price = function (activity_id, bid_name) {
    var biddings = Activity.get_the_activity(activity_id).biddings;
    var bid_price = _.chain(biddings[bid_name])
        .groupBy(function (bidding) {
            return parseInt(bidding.price);
        })
        .map(function (value, key) {
            return{"price": key, "count": value.length}
        })
        .find(function (bidding) {
            return bidding.count == 1;
        })
        .value();
    return bid_price;
};

Bidding.winner = function (activity_id, bid_name) {
    var biddings = Activity.get_the_activity(activity_id).biddings;
    var bid_price = Bidding.bid_price(activity_id, bid_name);
    var winner = _.find(biddings[bid_name], function (bidding) {
        return bidding.price == bid_price.price;
    });
    return winner;
};


Bidding.sign_up = function (activity_id, bid_name) {
    var winner = Bidding.winner(activity_id, bid_name);
    var sign_up = _.find(Activity.get_the_activity(activity_id).sign_ups, function (sign_up) {
        return sign_up.phone == winner.phone;
    });
    return sign_up;
};


function transform_biddings_to_view_model(activity_id, bid_name) {
    var winner = Bidding.winner(activity_id, bid_name);
    var sign_up = Bidding.sign_up(activity_id, bid_name);
    var winner_infos = [];
    var winner_info = {"name": sign_up.name, "phone": winner.phone, "price": winner.price}
    winner_infos.push(winner_info);
    return winner_infos;
};

