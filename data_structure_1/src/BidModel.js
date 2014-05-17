function Bid(activity_name) {
    var num = Activity.get_the_activity(activity_name).bids.length + 1;
    var name = '竞价' + num
    this.name = name;
    this.biddings = [];
};


Bid.get_current_bid = function(){
    return localStorage.current_bid;
};


Bid.prototype.create_new_bid = function (activity_name) {
    var activities = Activity.get_activities()
    var bid = new Bid(activity_name);
     _.map(activities, function (the_activity) {
        the_activity['name'] == Activity.get_current_activity() ? the_activity['bids'].push(bid) : '';
    });
    localStorage.setItem("activities", JSON.stringify(activities));
};


transform_bids_to_view_model = function (activity_name) {
    return Activity.get_the_activity(activity_name).bids
};