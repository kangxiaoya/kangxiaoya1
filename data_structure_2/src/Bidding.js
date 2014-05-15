function Bidding(sms_json) {
}

Bidding.create_new_bid = function (activity_id) {
    var activities = Activity.get_activities();
    var bid_name = "竞价1";
    _.map(activities, function (value, key) {
        if (key == activity_id) {
            value.bids.push(bid_name);
            value.biddings[bid_name] = [];
        }
    });
    localStorage.setItem("activities", JSON.stringify(activities));
};
