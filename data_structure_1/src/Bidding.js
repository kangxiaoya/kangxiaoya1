function Bidding(sms_json) {
    this.price = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
    this.phone = sms_json.messages[0].phone;
};


Bidding.get_current_activity = function () {
    var activities = Activity.get_activities();
    var current_activity = Activity.get_this_activity(activities);
    return current_activity;
};


Bidding.sign_up = function (sms_json) {
    var current_activity = Bidding.get_current_activity();
    var bidding = new Bidding(sms_json);
    return _.find(current_activity.sign_ups, function (the_sign_up) {
        return the_sign_up['phone'] == bidding['phone'];
    });
};


Bidding.apply_people = function (sms_json, bidding) {
    var current_activity = Bidding.get_current_activity();
    return _.find(current_activity.sign_ups, function (the_sign_up) {
        return the_sign_up['phone'] == bidding['phone']
    });
};


Bidding.repeat_price = function (bidding) {
    var biddings = [];
    return _.find(biddings, function (the_bidding) {
        return the_bidding['phone'] == bidding['phone'];
    });
};


Bidding.save_all = function (biddings) {
    var current_bid = Bid.get_current_bid();
    var activities = Activity.get_activities();
    var current_activity = Activity.get_this_activity(activities);
    var current_activity = _.map(current_activity.bids, function (the_bid) {
        return the_bid['name'] == current_bid ? the_bid['biddings'] = biddings : '';
    });
    localStorage.setItem('activities', JSON.stringify(activities));
};


Bidding.temporary_save = function (sms_json, bidding) {
    var biddings = [];
    var apply_people = Bidding.apply_people(sms_json, bidding);
    bidding['name'] = apply_people['name'];
    var repeat_price = Bidding.repeat_price(bidding)
    if (repeat_price == undefined) {
        biddings.push(bidding);
    }
    Bidding.save_all(biddings);
}


Bidding.judge_same = function (sms_json) {
    var bidding = new Bidding(sms_json);
    var sign_up = Bidding.sign_up(sms_json);
    if (sign_up !== undefined) {
        Bidding.temporary_save(sms_json, bidding);
    }
}


Bidding.bid_sign_up_sms = function (sms_json) {
    if (localStorage.is_bidding == "true") {
        Bidding.judge_same(sms_json);
    }
};


Bidding.get_bid = function (activity_name, bid_name) {
    return _.find(transform_bids_to_view_model(activity_name), function (bid) {
        return bid.name == bid_name;
    });
};


Bidding.get_bid_price = function (activity_name, bid_name) {
    var biddings = Bidding.get_bid(activity_name, bid_name).biddings
    var bid_price = _.groupBy(biddings, function (the_bidding) {
        return parseInt(the_bidding.price);
    });
    return bid_price;
};


Bidding.get_price_statistics = function (activity_name, bid_name) {
    var bid_price = Bidding.get_bid_price(activity_name, bid_name);
    return  _.map(bid_price, function (value, key) {
        var price_statistics = {};
        price_statistics['price'] = key;
        price_statistics['counter'] = value.length;
        if (value.length == 1) {
            price_statistics['name'] = value[0].name;
            price_statistics['phone'] = value[0].phone;
        }
        return price_statistics;
    });
};


Bidding.get_price_statistics_result = function (activity_name, bid_name) {
    var price_statistics = Bidding.get_price_statistics(activity_name, bid_name);
    return _.filter(price_statistics, function (the_result) {
        return the_result.counter == 1;
    });
};


function transform_biddings_to_view_model(activity_name, bid_name) {
    var price_statistics_result = Bidding.get_price_statistics_result(activity_name, bid_name);
    return price_statistics_result;
};