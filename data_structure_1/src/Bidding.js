function Bidding() {
};

Bidding.bid_sign_up_sms = function (sms_json) {
    if (localStorage.is_bidding == "true") {
        var activities = Activity.get_activities();
        var current_activity = _.find(activities, function (the_activity) {
            return the_activity['name'] == localStorage.current_activity;
        });
        var current_bid = localStorage.current_bid;
        var biddings = [];
        var bidding = {};
        bidding['price'] = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
        bidding['phone'] = sms_json.messages[0].phone;
        if (_.find(current_activity.sign_ups, function (the_sign_up) {
            return the_sign_up['phone'] == bidding['phone'];
        }) !== undefined) {
            var apply_people = _.find(current_activity.sign_ups, function (the_sign_up) {
                return the_sign_up['phone'] == bidding['phone']
            });
            bidding['name'] = apply_people['name'];
            if (_.find(biddings, function (the_bidding) {
                return the_bidding['phone'] == bidding['phone'];
            }) == undefined) {
                biddings.push(bidding);
            }
            var current_activity = _.map(current_activity.bids, function (the_bid) {
                return the_bid['name'] == current_bid ? the_bid['biddings'] = biddings : '';
            });
            localStorage.setItem('activities', JSON.stringify(activities));
        }
    }
}


function transform_biddings_to_view_model(activity_name, bid_name) {
    var bid = _.find(transform_bids_to_view_model(activity_name), function (bid) {
        return bid.name == bid_name
    });
    var biddings = bid.biddings
    var sortBy_biddings = _.sortBy(biddings, function (the_bidding) {
        return parseInt(the_bidding.price);
    });
    var groupBy_biddings = _.groupBy(sortBy_biddings, function (people) {
        return parseInt(people.price);
    });
    var map_biddings = _.map(groupBy_biddings, function (value, key) {
        var price_statistics = {};
        price_statistics['price'] = key;
        price_statistics['counter'] = value.length;
        if (value.length == 1) {
            price_statistics['name'] = value[0].name;
            price_statistics['phone'] = value[0].phone;
        }
        return price_statistics;
    });
    var price_statistics_result = _.filter(map_biddings, function (the_result) {
        return the_result.counter == 1;
    });
    return price_statistics_result;
}