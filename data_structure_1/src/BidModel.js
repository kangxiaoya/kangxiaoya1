function Bid(activity_name) {
    var num = Activity.get_the_activity(activity_name).bids.length + 1
    var name = '竞价' + num
    this.name = name;
    this.biddings = [];
};

Bid.prototype.create_new_bid = function (activity_name) {
    var activities = Activity.get_activities();
    var current_activity = Activity.get_current_activity();
    var bid = this;
    activities = _.map(activities, function (the_activity) {
        the_activity['name'] == current_activity ? the_activity['bids'].push(bid) : '';
        return the_activity;
    });
    localStorage.setItem("activities", JSON.stringify(activities));
};

transform_bids_to_view_model = function (activity_name) {
    return Activity.get_the_activity(activity_name).bids
};