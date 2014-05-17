function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
};

Activity.get_activities = function () {
    return JSON.parse(localStorage.activities)
};

Activity.get_activity_ids = function () {
    return JSON.parse(localStorage.activity_ids)||{};
};

Activity.get_activity_id_generator = function () {
    return parseInt(localStorage.activity_id_generator);
};

Activity.get_current_activity= function(){
    return localStorage.current_activity;
};

Activity.get_the_activity = function (activity_id) {
    var activities = Activity.get_activities();
    return activities[activity_id];
};

Activity.get_current_bid = function(){
    return localStorage.current_bid;
};

Activity.get_currently_active_biddings=function(){
    var bid = Activity.get_current_bid();
    return Activity.get_the_activity(Activity.get_current_activity()).biddings[bid];
};

Activity.prototype.create = function (activity_name) {
    var activities = Activity.get_activities();
    var counter = Activity.get_activity_id_generator();
    activities[counter] = this;
    localStorage.setItem('activities', JSON.stringify(activities));
    var activity_ids = Activity.get_activity_ids();
    activity_ids.push(counter.toString());
    localStorage.setItem('activity_ids', JSON.stringify(activity_ids));
    localStorage.current_activity = counter;
    localStorage.activity_id_generator = counter + 1;
};



