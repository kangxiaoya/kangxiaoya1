function Bidding() {
};

Bidding.bid_sign_up_sms = function (sms_json) {
    if (localStorage.is_bidding = "true") {
        var activities = JSON.parse(localStorage.activities);
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
                return the_sign_up['phone'] == bidding['phone'];
            });
            bidding['name'] = apply_people['name'];
            if (_.find(biddings, function (the_bidding) {
                return the_bidding['phone'] == bidding['phone'];
            }) == undefined) {
                biddings.push(bidding);
                var current_activity = _.map(current_activity.bids, function (the_bid) {
                    return the_bid['name'] == current_bid ? the_bid['biddings'] = biddings : '';
                });
                localStorage.setItem('activities', JSON.stringify(activities));
            }
        }
    }
}



